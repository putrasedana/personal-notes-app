import { Link, useNavigate } from "react-router-dom";
import { showSmartDate, truncateText } from "../utils";
import ActionButtons from "./ActionButtons";
import { CiCalendarDate } from "react-icons/ci";
import EmptyState from "./EmptyState";
import { Note } from "../utils/network-data";
import { useLocaleContext } from "../context/LocaleContext";
import parse from "html-react-parser";

export interface NotesListProps {
  notes: Note[];
  type: "active" | "archived";
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  archiveLoadingId: string | null;
}

const NoteList: React.FC<NotesListProps> = ({
  notes,
  onDelete,
  onToggleArchive,
  type,
  archiveLoadingId,
}) => {
  const navigate = useNavigate();
  const { locale, t } = useLocaleContext();

  if (!notes || notes.length === 0) {
    const emptyStates = {
      active: {
        title: t.emptyStateTitleActive,
        description: t.emptyStateDescriptionActive,
        buttonText: t.emptyStateButtonTextActive,
        buttonAction: () => navigate("/notes/new"),
      },
      archived: {
        title: t.emptyStateTitleArchived,
        description: t.emptyStateDescriptionArchived,
        buttonText: t.emptyStateButtonTextArchived,
        buttonAction: () => navigate("/"),
      },
    };

    const currentState = emptyStates[type];

    return (
      <EmptyState
        title={currentState.title}
        description={currentState.description}
        onButtonClick={currentState.buttonAction}
        buttonText={currentState.buttonText}
        showButton
      />
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="group relative flex flex-col p-5 rounded-xl border-t-4 border-gray-600 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm dark:shadow-gray-900/30"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            <Link
              to={`/notes/${note.id}`}
              className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {truncateText(note.title, 50)}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <CiCalendarDate className="w-5 h-5" />
            {showSmartDate(note.createdAt, locale)}
          </p>

          <div className="flex-1 mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 wrap-break-word">
            {parse(truncateText(note.body, 120))}
          </div>

          <div className="mt-auto">
            <ActionButtons
              noteId={note.id}
              onDelete={onDelete}
              onToggleArchive={onToggleArchive}
              isArchived={note.archived}
              paddingBottom="pb-1"
              archiveLoadingId={archiveLoadingId}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
