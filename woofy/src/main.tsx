import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./components/navbar.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer.tsx";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Navbar />
      <App />
      <Footer />
    </Router>
  </StrictMode>
);
