import { MdArchive, MdUnarchive } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { useLocaleContext } from "../context/LocaleContext";
import Spinner from "./Spinner";

interface ActionButtonsProps {
  noteId: string;
  isArchived?: boolean;
  onEdit?: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDelete: (id: string) => void;
  size?: "small" | "medium" | "large";
  paddingBottom?: string;
  archiveLoadingId: string | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  noteId,
  isArchived = false,
  onToggleArchive,
  onDelete,
  size = "medium",
  paddingBottom,
  archiveLoadingId,
}) => {
  const { t } = useLocaleContext();

  const sizeClasses = {
    small: {
      button: "w-8 h-8",
      icon: 16,
      text: "text-xs",
    },
    medium: {
      button: "w-10 h-10",
      icon: 20,
      text: "text-sm",
    },
    large: {
      button: "w-12 h-12",
      icon: 24,
      text: "text-base",
    },
  };

  const { button, icon } = sizeClasses[size];
  const isArchiveLoading = archiveLoadingId === noteId;

  return (
    <div className={`flex items-center gap-2 justify-end ${paddingBottom}`}>
      {/* Archive/Unarchive Button */}
      <button
        type="button"
        onClick={() => onToggleArchive(noteId)}
        disabled={isArchiveLoading}
        className={`${button} flex items-center justify-center rounded-full shadow-md transition-all duration-300 relative
    ${
      isArchiveLoading
        ? "cursor-not-allowed opacity-70"
        : "cursor-pointer hover:shadow-lg active:scale-95"
    }
    ${
      isArchived
        ? "bg-linear-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        : "bg-linear-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
    }
  `}
        title={isArchived ? t.unarchiveNote : t.archiveNote}
        aria-label={isArchived ? t.unarchiveNote : t.archiveNote}
      >
        {isArchiveLoading ? (
          <Spinner size={icon} />
        ) : isArchived ? (
          <MdUnarchive size={icon} className="text-white" />
        ) : (
          <MdArchive size={icon} className="text-white" />
        )}
      </button>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => onDelete(noteId)}
        className={`${button} cursor-pointer flex items-center justify-center rounded-full bg-linear-to-br from-red-500 to-pink-600 text-white shadow-md hover:shadow-lg  active:scale-95 transition-all duration-300 group relative hover:from-red-600 hover:to-pink-700`}
        title={t.deleteNote}
        aria-label={t.deleteNote}
      >
        <HiOutlineTrash
          size={icon}
          className="transition-transform duration-300"
        />
      </button>
    </div>
  );
};

export default ActionButtons;
