import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full cursor-pointer bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-gray-200 hover:bg-gray-900 dark:hover:bg-white"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="w-6 h-6" />
      ) : (
        <FiMoon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
