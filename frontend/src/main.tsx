import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProblemProvider } from "./context/ProblemContext";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProblemProvider>
      <App />
      <Toaster />
    </ProblemProvider>
  </StrictMode>
);
