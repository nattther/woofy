import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import AppLoaderWrapper from "./components/AppLoaderWrapper";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
<StrictMode>
  <CartProvider>
    <Router>
      <AppLoaderWrapper>
        <App />
      </AppLoaderWrapper>
    </Router>
  </CartProvider>
</StrictMode>
);

