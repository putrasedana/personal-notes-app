import { NavLink } from "react-router-dom";
import {
  HiX,
  HiHome,
  HiArchive,
  HiPlus,
  HiOutlineLogout,
} from "react-icons/hi";
import LocaleToggleButton from "./LocaleToggleButton";
import ThemeToggleButton from "./ThemeToggleButton";
import { useLocaleContext } from "../context/LocaleContext";
import { User } from "../utils/network-data";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  user: User | null;
  loading: boolean;
  onLogout: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  user,
  loading,
  onLogout,
}) => {
  const { t } = useLocaleContext();

  if (!isMobileMenuOpen) return null;

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Menu
            </h2>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* User info in mobile */}
          {user && !loading && (
            <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow bg-green-600">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Theme & Locale toggles in mobile */}
          <div className="flex items-center gap-4 mb-6">
            <LocaleToggleButton />
            <ThemeToggleButton />
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <HiHome className="w-5 h-5" />
                <span>{t.home}</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/archive"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <HiArchive className="w-5 h-5" />
                <span>{t.archive}</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/notes/new"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <HiPlus className="w-5 h-5" />
                <span>{t.addNote}</span>
              </NavLink>
            </li>

            <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg cursor-pointer"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>{t.logout}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
