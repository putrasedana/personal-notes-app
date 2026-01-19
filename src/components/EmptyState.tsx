import { FaRegFileAlt } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = (
    <FaRegFileAlt className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
  ),
  buttonText,
  onButtonClick,
  showButton = true,
  className = "",
}) => {
  return (
    <div
      className={`mt-10 p-6 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="text-center py-10">
        {icon}
        <p className="text-gray-600 dark:text-gray-300 text-xl font-semibold mb-2">
          {title}
        </p>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 text-base mb-6">
            {description}
          </p>
        )}
        {showButton && onButtonClick && (
          <button
            type="button"
            onClick={onButtonClick}
            className="cursor-pointer mt-6 px-6 py-2.5 bg-gray-800 dark:bg-gray-700/80 text-white dark:text-gray-100 font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
