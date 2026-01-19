import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import DetailNote from "./pages/DetailNote";
import AddNote from "./pages/AddNote";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
  addNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  fetchAllNotes,
  getAccessToken,
  User,
  getUserLogged,
} from "./utils/network-data";
import { Note } from "./utils/network-data";
import { swalConfirmConfig, swalToastConfig } from "./utils/swal-config";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocaleContext } from "./context/LocaleContext";
import { useActionLoading } from "./context/ActionLoadingContext";
import { withAntiFlickerLoading } from "./utils/withAntiFlickerLoading";
import Spinner from "./components/Spinner";
import GuestRoute from "./components/GuestRoute";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [authedUser, setAuthedUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(true);
  const { t } = useLocaleContext();
  const { startActionLoading, stopActionLoading } = useActionLoading();
  const [archiveLoadingId, setArchiveLoadingId] = useState<string | null>(null);

  const from =
    typeof location.state?.from === "string" ? location.state.from : "/";

  const loadNotes = async () => {
    try {
      setNotesLoading(true);
      const allNotes = await fetchAllNotes();

      const sorted = [...allNotes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setNotes(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      const token = getAccessToken();

      if (!token) {
        setAuthLoading(false);
        return;
      }

      const { error, data } = await getUserLogged();
      if (error || !data) {
        setAuthLoading(false);
        return;
      }

      setAuthedUser(data);
      setAuthLoading(false);

      loadNotes();
    };

    initApp();
  }, []);

  const handleLogin = async () => {
    const token = getAccessToken();

    if (!token) return;

    setAuthLoading(true);

    const { error, data } = await getUserLogged();

    if (!error && data) {
      setAuthedUser(data);
      await loadNotes();
      navigate(from, { replace: true });
    }

    setAuthLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthedUser(null);
    setNotes([]);
    navigate("/login");
  };

  const handleAddNote = async (title: string, body: string) => {
    await withAntiFlickerLoading(
      async () => {
        const { error, data } = await addNote({ title, body });
        if (error || !data) return;

        setNotes((prev) => [data, ...prev]);
        navigate("/");
        Swal.fire(swalToastConfig("success", t.addNoteSuccessMessage));
      },
      startActionLoading,
      stopActionLoading,
    );
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire(
      swalConfirmConfig(
        t.deleteConfirmationTitle,
        t.deleteConfirmationText,
        t.confirmButtonText,
        t.cancel,
      ),
    );

    if (!result.isConfirmed) return;

    await withAntiFlickerLoading(
      async () => {
        await deleteNote(id);

        const allNotes = await fetchAllNotes();
        setNotes(allNotes);

        location.pathname.startsWith("/notes/")
          ? navigate(-1)
          : navigate(location.pathname, { replace: true });

        Swal.fire(swalToastConfig("success", t.deleteSuccessMessage));
      },
      startActionLoading,
      stopActionLoading,
    );
  };

  const handleToggleArchive = async (id: string) => {
    const target = notes.find((n) => n.id === id);
    if (!target) return;

    const prevArchived = target.archived;
    const willArchive = !prevArchived;

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: willArchive } : n)),
    );

    try {
      setArchiveLoadingId(id);
      if (willArchive) {
        await archiveNote(id);
        Swal.fire(swalToastConfig("success", t.archiveSuccessMessage));
      } else {
        await unarchiveNote(id);
        Swal.fire(swalToastConfig("success", t.unarchiveSuccessMessage));
      }
    } catch (err) {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, archived: prevArchived } : n)),
      );
      Swal.fire(swalToastConfig("error", t.archiveUnarchiveFailedMessage));
    } finally {
      setArchiveLoadingId(null);
    }
  };

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center flex-col justify-center
      bg-white dark:bg-gray-900 transition-colors"
      >
        <Spinner size={80} />
        <p className="text-4xl mt-5 text-gray-800 dark:text-gray-50">
          {t.loadingTheApplication}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 h-full min-h-screen">
      {authedUser && (
        <Header
          user={authedUser}
          onLogout={handleLogout}
          loading={authLoading}
        />
      )}

      <main>
        <Routes>
          <Route element={<GuestRoute user={authedUser} />}>
            <Route
              path={"/login"}
              element={<LoginPage onLoginSuccess={handleLogin} />}
            />
            <Route path={"/register"} element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute user={authedUser} />}>
            <Route
              path="/"
              element={
                <NotesPage
                  type="active"
                  notes={notes}
                  loading={notesLoading}
                  onDelete={handleDelete}
                  onToggleArchive={handleToggleArchive}
                  archiveLoadingId={archiveLoadingId}
                />
              }
            />

            <Route
              path="/archive"
              element={
                <NotesPage
                  type="archived"
                  notes={notes}
                  loading={notesLoading}
                  onDelete={handleDelete}
                  onToggleArchive={handleToggleArchive}
                  archiveLoadingId={archiveLoadingId}
                />
              }
            />

            <Route
              path="/notes/new"
              element={<AddNote onAdd={handleAddNote} />}
            />

            <Route
              path="/notes/:id"
              element={
                <DetailNote
                  onDelete={handleDelete}
                  onToggleArchive={handleToggleArchive}
                  archiveLoadingId={archiveLoadingId}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFound user={authedUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
