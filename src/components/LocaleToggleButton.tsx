import React from "react";
import { useLocaleContext } from "../context/LocaleContext";

interface LocaleToggleButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LocaleToggleButton: React.FC<LocaleToggleButtonProps> = ({
  className = "",
  size = "md",
}) => {
  const { toggleLocale, locale } = useLocaleContext();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={`Toggle language to ${locale === "id" ? "English" : "Indonesian"}`}
      title={`Toggle language to ${locale === "id" ? "English" : "Indonesian"}`}
      className={`
    ${sizeClasses[size]}
    flex items-center justify-center
    rounded-full
    cursor-pointer
    font-bold text-white
    ${className}
  `}
    >
      {locale === "id" ? (
        <span
          className="
      w-full h-full
      flex items-center justify-center
      rounded-full
      bg-blue-600/90
      hover:bg-blue-600
    "
        >
          EN
        </span>
      ) : (
        <span
          className="
      w-full h-full
      flex items-center justify-center
      rounded-full
      bg-red-600/90
      hover:bg-red-600
    "
        >
          ID
        </span>
      )}
    </button>
  );
};

export default LocaleToggleButton;
