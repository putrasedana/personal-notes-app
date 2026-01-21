import { Note } from "./network-data";

const showFormattedDate = (
  date: string | Date,
  locale: string = "id-ID",
): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(new Date(date));
};

export const showRelativeTime = (
  date: string | Date,
  locale: string = "id-ID",
): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secondsInUnit] of units) {
    const value = Math.trunc(diffInSeconds / secondsInUnit);
    if (Math.abs(value) >= 1) {
      return rtf.format(value, unit);
    }
  }

  return rtf.format(0, "second");
};

export const showSmartDate = (date: string | Date, locale: string): string => {
  const now = new Date();
  const target = new Date(date);

  const diffInYears =
    Math.abs(now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24 * 365);

  if (diffInYears < 1) {
    return showRelativeTime(date, locale);
  }

  return showFormattedDate(date, locale);
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const sortNotesByDate = (notes: Note[]) => {
  return [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

// Simulate network delay for testing loading state
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { showFormattedDate, truncateText, sortNotesByDate, sleep };
