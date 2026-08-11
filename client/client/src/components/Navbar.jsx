import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./store/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>

        <Navbar />

        <App />

      </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);