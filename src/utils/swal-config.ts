import { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

export const swalConfirmConfig = (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string,
) => ({
  title,
  text,
  icon: "warning" as const,
  showCancelButton: true,
  confirmButtonText: confirmButtonText,
  cancelButtonText: cancelButtonText,
  customClass: {
    popup:
      "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white! text-gray-800! dark:bg-gray-800! dark:text-gray-100!",
    title: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2",
    htmlContainer: "text-gray-700 dark:text-gray-300",
    confirmButton: `
      px-6 py-2.5 
      bg-gradient-to-r from-red-600 to-red-600 dark:from-red-700 dark:to-red-800
      text-white dark:text-gray-100 font-semibold 
      rounded-lg 
      hover:from-red-700 hover:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900
      transition-all duration-200 cursor-pointer 
    `,
    cancelButton: `
      px-6 py-2.5 
      bg-gradient-to-r from-gray-200 to-gray-300 
      dark:from-gray-700 dark:to-gray-600
      text-gray-800 dark:text-gray-300 font-semibold 
      rounded-lg 
      hover:from-gray-300 hover:to-gray-400 
      dark:hover:from-gray-600 dark:hover:to-gray-500
      transition-all duration-200 cursor-pointer 
    `,
    icon: "text-red-500 dark:text-red-400 mb-1",
    actions: "gap-3 mt-6",
  },
  buttonsStyling: false,
  reverseButtons: true,
  didOpen: () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      const popup = document.querySelector(".swal2-popup") as HTMLElement;
      if (popup) {
        popup.style.background = "#1f2937";
        popup.style.color = "#f3f4f6";
      }
    }
  },
});

// export const swalSuccessConfig = (title: string, text: string) => ({
//   title,
//   text,
//   icon: "success" as const,
//   timer: 1500,
//   showConfirmButton: false,
//   customClass: {
//     popup:
//       "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white! text-gray-800! dark:bg-gray-800! dark:text-gray-100!",
//     title: "text-2xl font-bold text-gray-900 dark:text-gray-100",
//     htmlContainer: "text-gray-700 dark:text-gray-300",
//     icon: "text-green-700 dark:text-green-400",
//   },
//   didOpen: () => {
//     const isDarkMode = document.documentElement.classList.contains("dark");
//     if (isDarkMode) {
//       const popup = document.querySelector(".swal2-popup") as HTMLElement;
//       if (popup) {
//         popup.style.background = "#1f2937";
//         popup.style.color = "#f3f4f6";
//       }
//     }
//   },
// });

// export const swalErrorConfig = (title: string, text: string) => ({
//   title,
//   text,
//   icon: "error" as const,
//   timer: 2000,
//   showConfirmButton: false,
//   customClass: {
//     popup:
//       "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white! text-gray-800! dark:bg-gray-800! dark:text-gray-100!",
//     title: "text-2xl font-bold text-gray-900 dark:text-gray-100",
//     htmlContainer: "text-gray-700 dark:text-gray-300",
//     icon: "text-red-500 dark:text-red-400",
//   },
//   didOpen: () => {
//     const isDarkMode = document.documentElement.classList.contains("dark");
//     if (isDarkMode) {
//       const popup = document.querySelector(".swal2-popup") as HTMLElement;
//       if (popup) {
//         popup.style.background = "#1f2937";
//         popup.style.color = "#f3f4f6";
//       }
//     }
//   },
// });

export const swalToastConfig = (
  icon: SweetAlertIcon,
  title: string,
): SweetAlertOptions => ({
  icon,
  title,
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  customClass: {
    popup:
      "rounded-lg border bg-white! text-gray-800! dark:bg-gray-800! dark:text-gray-100!",
    title: "text-gray-900 dark:text-gray-100",
    icon: `${
      icon === "success"
        ? "text-green-700 dark:text-green-400"
        : icon === "error"
          ? "text-red-500 dark:text-red-400"
          : icon === "warning"
            ? "text-yellow-500 dark:text-yellow-400"
            : "text-blue-500 dark:text-blue-400"
    }`,
  },
  didOpen: () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      const toast = document.querySelector(".swal2-toast") as HTMLElement;
      if (toast) {
        toast.style.background = "#1f2937";
        toast.style.color = "#f3f4f6";
        toast.style.borderColor = "#374151";
      }
    }
  },
});
