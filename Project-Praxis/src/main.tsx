import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme on app load
(() => {
  const saved = localStorage.getItem("theme");
  const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const html = document.documentElement;
  if (isDark) {
    html.classList.add("dark");
  } else {
    html.classList.add("light");
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
