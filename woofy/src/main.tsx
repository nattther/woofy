import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import { CartProvider } from "./context/CartContext";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <Navbar />
        <App />
        <Footer />
      </Router>
    </CartProvider>
  </StrictMode>
);

