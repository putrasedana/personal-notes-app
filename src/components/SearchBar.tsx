import { IoClose, IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useLocaleContext } from "../context/LocaleContext";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { t } = useLocaleContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative w-full mt-6">
      <div className="relative group">
        {/* Input container */}
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchByTitle}
            value={keyword}
            onChange={handleChange}
            aria-label={t.searchByTitle}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-400 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow dark:shadow-gray-900/30 "
          />

          {/* Search icon */}
          <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 group-focus-within:text-gray-800 dark:group-focus-within:text-gray-300 transition-colors duration-300" />

          {/* Clear button */}
          {keyword && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 cursor-pointer"
              aria-label="Hapus pencarian"
            >
              <IoClose className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
