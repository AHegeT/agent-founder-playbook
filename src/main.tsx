import { createRoot } from "react-dom/client";
import { Buffer } from "buffer";
import "./index.css";
import "./i18n/config";
import App from "./App.tsx";

// Polyfill Buffer for gray-matter in browser
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(<App />);
