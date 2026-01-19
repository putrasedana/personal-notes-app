import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheck, MdClose } from "react-icons/md";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { useLocaleContext } from "../context/LocaleContext";

interface NoteFormProps {
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (title: string, body: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  initialTitle = "",
  initialBody = "",
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [isBodyEmpty, setIsBodyEmpty] = useState<boolean>(!initialBody);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLocaleContext();

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setTitle(initialTitle);
    if (bodyRef.current) {
      bodyRef.current.innerHTML = initialBody;
      setIsBodyEmpty(!initialBody.trim());
    }
  }, [initialTitle, initialBody]);

  const handleBodyChange = () => {
    if (bodyRef.current) {
      setIsBodyEmpty(!bodyRef.current.textContent?.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bodyRef.current) {
      onSubmit(title, bodyRef.current.innerHTML);
    }
  };

  return (
    <div className="py-4 pb-24 md:pb-10 pt-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Title input */}
        <div className="mb-6 sm:mb-8 group">
          <input
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder={t.addNotetitlePlaceholder}
            required
            className="w-full bg-transparent border-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 pb-3 sm:pb-4 border-b border-transparent focus:border-gray-300 dark:focus:border-gray-600 transition-colors duration-300"
          />
        </div>

        {/* Content editor */}
        <div className="relative mb-20 sm:mb-24 md:mb-28">
          <div
            ref={bodyRef}
            onInput={handleBodyChange}
            contentEditable
            suppressContentEditableWarning
            className="min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] w-full bg-transparent text-lg sm:text-xl text-gray-800 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 prose prose-sm sm:prose-lg max-w-none dark:prose-invert
              [&_p]:mb-3 sm:[&_p]:mb-4 
              [&_h1]:text-2xl sm:[&_h1]:text-3xl md:[&_h1]:text-4xl 
              [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl 
              [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl 
              [&_ul]:list-disc [&_ol]:list-decimal 
              [&_li]:ml-4 sm:[&_li]:ml-6 
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 dark:[&_blockquote]:border-gray-600 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:italic"
            data-placeholder={t.addNoteBodyPlaceholder}
          />

          {/* Placeholder */}
          {isBodyEmpty && (
            <div className="absolute top-0 left-0 pointer-events-none text-lg sm:text-xl text-gray-400 dark:text-gray-500">
              {t.addNoteBodyPlaceholder}
            </div>
          )}
        </div>

        {/* Desktop Editor Toolbar & Action Buttons */}
        {!isMobile && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 sm:px-6 lg:px-8 z-50">
            <div className="bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-gray-900/50 p-4 flex items-center justify-between">
              {/* Left side: Editor toolbar */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => document.execCommand("bold", false)}
                  className="p-2 sm:p-2.5 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  title="Bold (Ctrl+B)"
                >
                  <AiOutlineBold className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => document.execCommand("italic", false)}
                  className="p-2 sm:p-2.5 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  title="Italic (Ctrl+I)"
                >
                  <AiOutlineItalic className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => document.execCommand("underline", false)}
                  className="p-2 sm:p-2.5 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  title="Underline (Ctrl+U)"
                >
                  <AiOutlineUnderline className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="h-4 sm:h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2 sm:mx-3"></div>

                <button
                  type="button"
                  onClick={() =>
                    document.execCommand("insertUnorderedList", false)
                  }
                  className="p-2 sm:p-2.5 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  title="Bullet List"
                >
                  <AiOutlineUnorderedList className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document.execCommand("insertOrderedList", false)
                  }
                  className="p-2 sm:p-2.5 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  title="Numbered List"
                >
                  <AiOutlineOrderedList className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Right side: Action buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex cursor-pointer items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
                  title={t.cancel}
                >
                  <MdClose className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">{t.cancel}</span>
                </button>

                {/* Save button */}
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
                  title={t.save}
                >
                  <MdCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">{t.save}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Toolbar at top of keyboard area */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 z-40">
            <div className="flex items-center justify-center gap-8 gap-y-4 py-2 flex-wrap">
              <button
                type="button"
                onClick={() => document.execCommand("bold", false)}
                className="p-3 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                title="Bold"
              >
                <AiOutlineBold className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("italic", false)}
                className="p-3 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                title="Italic"
              >
                <AiOutlineItalic className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("underline", false)}
                className="p-3 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                title="Underline"
              >
                <AiOutlineUnderline className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  document.execCommand("insertUnorderedList", false)
                }
                className="p-3 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                title="Bullet List"
              >
                <AiOutlineUnorderedList className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("insertOrderedList", false)}
                className="p-3 cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                title="Numbered List"
              >
                <AiOutlineOrderedList className="h-5 w-5" />
              </button>

              {/* Save button (mobile) */}
              <button
                type="submit"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-semibold shadow-lg hover:bg-gray-900 dark:hover:bg-white transition-all duration-200"
                title={t.save}
              >
                <MdCheck className="w-6 h-6" />
              </button>

              {/* Cancel button (mobile) */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                title={t.cancel}
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
