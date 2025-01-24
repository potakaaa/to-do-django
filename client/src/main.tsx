import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalStateProvider } from "./provider/globals.tsx";

createRoot(document.getElementById("root")!).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
);
