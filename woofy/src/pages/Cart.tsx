import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, getTotalPrice, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#4A4A4A]">
      <main className="container mx-auto max-w-2xl py-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mon panier</h1>
          {/* Bouton Continuez les achats */}
          <button
            className="px-4 py-2 bg-[#89CFF0] text-white rounded-lg font-semibold shadow-md hover:bg-[#77bfe0] transition"
            onClick={() => navigate("/products")}
            aria-label="Continuer les achats"
          >
            Continuez les achats
          </button>
        </div>
        {cart.items.length === 0 ? (
          <div className="text-center text-gray-400 mt-16">
            <span className="text-4xl mb-2 block">🛒</span>
            Panier vide
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-8">
              {cart.items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center bg-white rounded-lg shadow px-4 py-3 border border-[#C1E1C1]"
                >
                  <img
                    src={product.featuredAsset?.preview ?? "/default-image.jpg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#C1E1C1] shadow mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{product.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="px-2 py-1 rounded bg-[#C1E1C1] text-[#4A4A4A] font-bold disabled:opacity-60 transition"
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>
                      <span className="px-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 rounded bg-[#C1E1C1] text-[#4A4A4A] font-bold transition"
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#89CFF0" }}>
                      {(product.variants[0]?.priceWithTax / 100).toFixed(2)} € l’unité
                    </div>
                  </div>
                  <div className="w-20 text-right font-semibold">
                    {(quantity * (product.variants[0]?.priceWithTax ?? 0) / 100).toFixed(2)} €
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-3 hover:bg-[#C1E1C1]/70 transition rounded-full p-2"
                    aria-label="Retirer"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M6 6l8 8M6 14L14 6" stroke="#89CFF0" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-8 text-lg font-bold border-t pt-4" style={{ borderColor: "#C1E1C1", color: "#4A4A4A" }}>
              <span>Total :</span>
              <span>{(getTotalPrice() / 100).toFixed(2)} €</span>
            </div>
            <button
              className="w-full bg-[#89CFF0] hover:bg-[#77bfe0] active:bg-[#6ea5cf] text-white font-bold py-3 rounded-xl shadow-md transition mb-2"
              onClick={() => navigate("/checkout")}
              aria-label="Passer à la caisse"
            >
              Passer à la caisse
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default CartPage;
