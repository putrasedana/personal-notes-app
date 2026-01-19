import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { Note } from "../utils/network-data";
import SkeletonNoteList from "../components/SkeletonNoteList";
import { useLocaleContext } from "../context/LocaleContext";
import { useActionLoading } from "../context/ActionLoadingContext";

export interface NotesPageProps {
  notes: Note[];
  type: "active" | "archived";
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  loading: boolean;
  archiveLoadingId: string | null;
}

const NotesPage: React.FC<NotesPageProps> = ({
  notes,
  type,
  onDelete,
  onToggleArchive,
  loading,
  archiveLoadingId,
}) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { t } = useLocaleContext();
  const { actionLoading } = useActionLoading();

  const filteredNotes = notes
    .filter((note) => (type === "active" ? !note.archived : note.archived))
    .filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));

  if (loading || actionLoading) {
    return <SkeletonNoteList />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-10 px-4 md:px-6 lg:px-8 xl:px-0">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {type === "active" ? t.activeNotes : t.archivedNotes}
      </h2>
      <SearchBar />

      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        onToggleArchive={onToggleArchive}
        type={type}
        archiveLoadingId={archiveLoadingId}
      />
    </div>
  );
};

export default NotesPage;
