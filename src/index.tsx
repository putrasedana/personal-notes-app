import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import { LocaleProvider } from "./context/LocaleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ActionLoadingProvider } from "./context/ActionLoadingContext";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <LocaleProvider>
        <ActionLoadingProvider>
          <App />
        </ActionLoadingProvider>
      </LocaleProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
