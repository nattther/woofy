import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/home";
import Products from "./pages/Products";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/produit/:slug" element={<ProductDetail />} />
    <Route path="/products" element={<Products />} />
  </Routes>
);

export default App;