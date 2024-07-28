import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppState } from "./context/index.tsx";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppState>
    <App />
    <div className="gradient"></div>
    <Toaster position="top-center" richColors />
  </AppState>
);
