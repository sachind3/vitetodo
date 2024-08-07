import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppState } from "./context/index.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppState>
      <App />
      <div className="gradient"></div>
      <Toaster position="top-center" richColors />
    </AppState>
  </ThemeProvider>
);
