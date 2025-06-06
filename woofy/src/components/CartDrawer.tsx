import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  // Handler pour swipe-to-close
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (info.offset.x > 100) { // tu peux ajuster la distance de swipe
      onClose();
    }
  };

  // Aller sur /cart (ferme d'abord le drawer)
  const handleGoToCart = () => {
    onClose();
    setTimeout(() => navigate("/cart"), 220);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay doux, clickable */}
          <motion.div
            className="fixed inset-0 z-40 bg-[#89CFF033] backdrop-blur-sm transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer animé & draggable */}
          <motion.aside
            className="
              fixed top-0 right-0 h-full w-[90vw] sm:w-[350px] max-w-full bg-white
              shadow-2xl flex flex-col z-50 border-l
            "
            style={{
              borderColor: "#C1E1C1",
              color: "#4A4A4A",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {/* Bouton fermer */}
            <button
              className="absolute top-4 right-4 text-2xl font-bold hover:bg-[#C1E1C1]/60 rounded-full w-9 h-9 flex items-center justify-center transition"
              style={{ color: "#89CFF0" }}
              onClick={onClose}
              aria-label="Fermer le panier"
            >
              <span aria-hidden>×</span>
            </button>

            {/* Header */}
            <h2
              className="p-6 pt-8 text-2xl font-bold border-b"
              style={{
                borderColor: "#C1E1C1",
                color: "#4A4A4A",
              }}
            >
              Votre panier
            </h2>

            {/* Liste des produits */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center mt-14 text-[#89CFF0]">
                  <span className="text-4xl mb-2">🛒</span>
                  <span style={{ color: "#4A4A4A" }}>Panier vide…</span>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex items-center rounded-lg bg-[#89CFF018] px-3 py-2 shadow-sm group border"
                      style={{ borderColor: "#C1E1C1" }}
                    >
                      <img
                        src={product.featuredAsset?.preview ?? "/default-image.jpg"}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg shadow mr-3 border"
                        style={{ borderColor: "#C1E1C1" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate" style={{ color: "#4A4A4A" }}>
                          {product.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "#89CFF0" }}>
                          {quantity} × {(product.variants[0]?.priceWithTax / 100).toFixed(2)} €
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="ml-2 hover:bg-[#C1E1C1]/70 transition rounded-full p-2"
                        aria-label="Retirer"
                        style={{ color: "#89CFF0" }}
                      >
                        {/* Icône X svg */}
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M6 6l8 8M6 14L14 6" stroke="#89CFF0" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Footer total + bouton */}
            <div
              className="p-6 border-t flex flex-col gap-2 bg-[#89CFF013]"
              style={{ borderColor: "#C1E1C1" }}
            >
              <div className="flex justify-between font-semibold text-lg" style={{ color: "#4A4A4A" }}>
                <span>Total</span>
                <span>{(getTotalPrice() / 100).toFixed(2)} €</span>
              </div>
              <button
                onClick={handleGoToCart}
                className="w-full mt-3 bg-[#89CFF0] hover:bg-[#77bfe0] active:bg-[#6ea5cf] text-white font-bold py-3 rounded-xl shadow-md transition
                  disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={cart.items.length === 0}
                style={{
                  boxShadow: "0 2px 6px 0 #89CFF055",
                  letterSpacing: "0.02em",
                }}
              >
                Voir le panier
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
