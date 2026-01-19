import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { MdArchive, MdUnarchive } from "react-icons/md";
import ActionButtons from "../components/ActionButtons";
import parse from "html-react-parser";
import NotFound from "./NotFound";
import { getNote, Note } from "../utils/network-data";
import { useLocaleContext } from "../context/LocaleContext";
import { showSmartDate } from "../utils";

interface DetailNoteProps {
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  archiveLoadingId: string | null;
}

const DetailNote: React.FC<DetailNoteProps> = ({
  onDelete,
  onToggleArchive,
  archiveLoadingId,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const { locale, t } = useLocaleContext();

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      const { error, data } = await getNote(id);
      setNote(!error ? data : null);
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  if (loading) return null;

  if (!note) return <NotFound user={null} />;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 xl:px-0 py-6 lg:py-10">
      <div
        className={`inline-flex items-center gap-1 mt-5 px-6 py-2 rounded-full font-medium ${
          note.archived
            ? "visible bg-amber-200 text-gray-800"
            : "visible bg-green-200 text-gray-800"
        }`}
      >
        {note.archived ? (
          <>
            <MdArchive size={20} />
            <span>{t.archived}</span>
          </>
        ) : (
          <>
            <MdUnarchive size={20} />
            <span>{t.active}</span>
          </>
        )}
      </div>

      <h1 className="text-[48px] mb-2 wrap-break-words font-bold">
        {note.title}
      </h1>

      <div className="flex items-center gap-2 text-gray-400 mb-6">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt size={14} />
          <span>{t.createdAt}</span>
        </div>
        <span> {showSmartDate(note.createdAt, locale)}</span>
      </div>

      <div className="mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 wrap-break-word">
        {parse(note.body)}
      </div>

      <ActionButtons
        noteId={note.id}
        size="large"
        onDelete={onDelete}
        onToggleArchive={() => {
          onToggleArchive(note.id);
          setNote((prev) =>
            prev ? { ...prev, archived: !prev.archived } : prev,
          );
        }}
        onEdit={() => navigate(`/notes/${note.id}/edit`)}
        isArchived={note.archived}
        archiveLoadingId={archiveLoadingId}
      />
    </div>
  );
};

export default DetailNote;
