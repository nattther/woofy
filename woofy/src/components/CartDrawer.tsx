import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

/** Drawer panier animé à droite */
interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  // Ferme drawer et va sur /cart
  const handleGoToCart = () => {
    onClose();
    setTimeout(() => navigate("/cart"), 200); // petit délai pour l’anim
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl transition-transform z-50
        ${open ? "translate-x-0" : "translate-x-full"}
        duration-300
      `}
      style={{ boxShadow: open ? "0 0 20px rgba(0,0,0,0.15)" : undefined }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay clicable pour fermer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
      {/* Contenu drawer */}
      <div className="relative h-full flex flex-col z-50">
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={onClose}
          aria-label="Fermer le panier"
        >
          ×
        </button>
        <h2 className="p-6 text-xl font-bold border-b">Votre panier</h2>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">Panier vide…</div>
          ) : (
            <ul className="space-y-4">
              {cart.items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center border-b pb-2 last:border-b-0"
                >
                  <img
                    src={product.featuredAsset?.preview ?? "/default-image.jpg"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {quantity} x {(product.variants[0]?.priceWithTax / 100).toFixed(2)} €
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500 font-bold ml-2"
                    aria-label="Retirer"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-6 border-t flex flex-col gap-2">
          <div className="flex justify-between font-semibold">
            <span>Total :</span>
            <span>{(getTotalPrice() / 100).toFixed(2)} €</span>
          </div>
          <button
            onClick={handleGoToCart}
            className="w-full mt-2 bg-[#89CFF0] text-white font-bold py-3 rounded-lg hover:bg-[#77bfe0] transition disabled:opacity-60"
            disabled={cart.items.length === 0}
          >
            Voir le panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
