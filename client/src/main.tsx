import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalStateProvider } from "./provider/globals.tsx";
import { ThemeProvider } from "./provider/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </ThemeProvider>
);
