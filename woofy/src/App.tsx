import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/home";
import Products from "./pages/Products";
import CartPage from "./pages/Cart";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/produit/:slug" element={<ProductDetail />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<CartPage />} />
  </Routes>
);

export default App;