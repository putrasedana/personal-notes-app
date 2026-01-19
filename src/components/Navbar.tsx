import { NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { useLocaleContext } from "../context/LocaleContext";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { t } = useLocaleContext();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium ${
      isActive
        ? "underline text-gray-900 dark:text-white"
        : "text-gray-500 dark:text-gray-300 hover:underline hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <nav className="navbar">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink to="/" end className={navLinkClass}>
            {t.home}
          </NavLink>
        </li>

        <li>
          <NavLink to="/archive" className={navLinkClass}>
            {t.archive}
          </NavLink>
        </li>

        <li>
          <NavLink to="/notes/new" className={navLinkClass}>
            {t.addNote}
          </NavLink>
        </li>

        <li>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 font-medium rounded-lg cursor-pointer"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span>{t.logout}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
