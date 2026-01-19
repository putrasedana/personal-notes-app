import { createContext, useContext, useEffect, useState } from "react";
import id from "../locales/id";
import en from "../locales/en";

export type Locale = "id" | "en";

const messages = {
  id,
  en,
};

interface LocaleContextType {
  locale: Locale;
  t: typeof id;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale") as Locale | null;
      if (saved && (saved === "id" || saved === "en")) {
        setLocaleState(saved);
      }
    }
  }, []);

  const toggleLocale = () => {
    setLocaleState((prev) => {
      const next = prev === "id" ? "en" : "id";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t: messages[locale],
        toggleLocale,
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used inside LocaleProvider");
  }
  return context;
};
