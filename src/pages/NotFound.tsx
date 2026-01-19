import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useLocaleContext } from "../context/LocaleContext";
import { User } from "../utils/network-data";
import { BsEmojiSmile } from "react-icons/bs";

interface NotFoundProps {
  user: User | null;
}

const NotFound = ({ user }: NotFoundProps) => {
  const { t } = useLocaleContext();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const isAuthenticated = Boolean(user);

  const showAlreadyLoggedIn = isAuthenticated && isAuthPage;

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-4 px-4">
      <h1 className="text-[96px] font-bold">
        {showAlreadyLoggedIn ? <BsEmojiSmile className="mb-4" /> : "404"}
      </h1>

      <p className="text-[20px] text-on-background-grey max-w-md">
        {showAlreadyLoggedIn ? t.alreadyLoggedInMessage : t.pageNotFoundMessage}
      </p>

      <Link to="/" className="mt-6">
        <button
          type="button"
          className="flex items-center justify-center text-[32px] w-12 h-12 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 cursor-pointer"
          title={t.goToHome}
        >
          <FaHome />
        </button>
      </Link>
    </section>
  );
};

export default NotFound;
