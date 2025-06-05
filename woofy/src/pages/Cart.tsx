import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, getTotalPrice, updateQuantity } = useCart();
    const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#4A4A4A]">
      <main className="container mx-auto py-10 flex-1">
        <h1 className="text-3xl font-bold mb-6">Mon panier</h1>
        {cart.items.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">Panier vide</div>
        ) : (
          <>
            <ul className="space-y-4 mb-8">
              {cart.items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center border-b pb-3 last:border-b-0"
                >
                  <img
                    src={product.featuredAsset?.preview ?? "/default-image.jpg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{product.name}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, Math.max(1, quantity - 1))
                        }
                        disabled={quantity <= 1}
                        className="px-2 py-0.5 rounded bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2">{quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="px-2 py-0.5 rounded bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {(product.variants[0]?.priceWithTax / 100).toFixed(2)} € l’unité
                    </div>
                  </div>
                  <div className="w-20 text-right font-semibold">
                    {(quantity * (product.variants[0]?.priceWithTax ?? 0) / 100).toFixed(2)} €
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ml-3 text-red-500 font-bold"
                    aria-label="Retirer"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-8 text-lg font-bold">
              <span>Total :</span>
              <span>{(getTotalPrice() / 100).toFixed(2)} €</span>
            </div>
<button
  className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition"
  onClick={() => navigate("/checkout")}
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
