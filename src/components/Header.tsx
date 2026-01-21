import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggleButton from "./ThemeToggleButton";
import LocaleToggleButton from "./LocaleToggleButton";
import { useLocaleContext } from "../context/LocaleContext";
import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { User } from "../utils/network-data";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  loading: boolean;
}

function Header({ user, onLogout, loading }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLocaleContext();

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 lg:px-8 xl:px-0">
        {/* Logo */}
        <div className="logo">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-semibold hover:opacity-90 text-gray-900 dark:text-white"
          >
            <h1 className="hover:underline">{t.appName}</h1>
          </Link>
        </div>

        {/* Mobile menu button (hamburger) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>

        {/* User Info & Navbar - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <LocaleToggleButton />
          <ThemeToggleButton />

          {loading ? (
            <div className="animate-pulse flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow bg-green-600">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            </div>
          ) : null}

          {/* Navbar */}
          <Navbar onLogout={onLogout} />
        </div>

        {/* Mobile menu overlay */}
        <MobileMenuOverlay
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          user={user}
          loading={loading}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

export default Header;
