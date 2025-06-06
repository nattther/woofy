import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/productApi";
import type { Product } from "../type/product";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showDetail, setShowDetail] = useState(false);

const { cart, addToCart } = useCart();


  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    fetchProductBySlug(slug)
      .then((prod) => {
        setProduct(prod);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du produit :", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <motion.img
          src="/icons/logo.png"
          alt="Chargement"
          className="h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-600">
        Produit introuvable
      </div>
    );
  }

  const variant = product.variants[0];
  const maxStock = variant?.stockOnHand ?? 0;

  const increment = () =>
    setQuantity((q) => (q < maxStock ? q + 1 : q));
  const decrement = () =>
    setQuantity((q) => (q > 1 ? q - 1 : q));





const addToCartHandler = () => {
  if (!product) return;

  const variant = product.variants[0];
  const stock = variant?.stockOnHand ?? 0;

  // Vérifier si la quantité demandée dépasse le stock
  const existingItem = cart.items.find((item) => item.product.id === product.id);
  const currentQty = existingItem?.quantity ?? 0;
  const newQty = currentQty + quantity;

  if (newQty > stock) {
    toast.error(`Stock insuffisant pour ${product.name}. Stock disponible : ${stock}`, {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  addToCart(product, quantity);

  toast.success(`${product.name} ajouté au panier !`, {
    position: "top-right",
    autoClose: 3000,
  });

  navigate("/products");
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-[#fffcf7] text-[#4A4A4A]"
    >
      <main className="flex-1 container mx-auto py-12 px-4">
        
<Link
  to="/products"
  className="mt-6 mb-6 inline-block text-[#4A4A4A] font-medium underline hover:text-[#89CFF0] transition"
>
  ← Revenir à la boutique
</Link>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image à gauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center bg-white rounded-xl p-6 shadow-md min-h-[420px]"
          >
            <img
              src={product.featuredAsset?.preview ?? "/default-image.jpg"}
              alt={product.name}
              className="object-contain max-h-96 w-full"
            />
          </motion.div>

          {/* Infos produit à droite */}
          <div className="flex-1 flex flex-col justify-start">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-3"
            >
              {product.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold mb-6"
            >
              {(variant.priceWithTax / 100).toFixed(2)} €
            </motion.div>

            {/* Sélecteur de quantité */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-white rounded-md border px-2 py-1 shadow w-32">
                <button
                  onClick={decrement}
                  className="text-2xl px-2 disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Réduire"
                  type="button"
                >
                  –
                </button>
                <span className="mx-2 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={increment}
                  className="text-2xl px-2 disabled:opacity-40"
                  disabled={quantity >= maxStock}
                  aria-label="Augmenter"
                  type="button"
                >
                  +
                </button>
              </div>
              <span className="ml-2 text-sm font-medium text-[#4A4A4A]">
                <span
                  className={maxStock === 0 ? "text-red-500" : "text-[#4A4A4A]"}
                >
                  {maxStock} en stock
                </span>
                <span className="text-[#4A4A4A] opacity-60">*</span>
              </span>
            </div>

            {/* Bouton ajouter au panier */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#C1E1C1] hover:bg-green-200 text-[#4A4A4A] font-bold py-3 rounded-lg transition mb-6 shadow"
              onClick={addToCartHandler}
            >
              Ajouter au panier
            </motion.button>

            {/* Détail de l’article (toggle) */}
            <div className="mt-4">
              <div
                className="flex items-center justify-between bg-[#89CFF0] text-white px-4 py-3 rounded-md cursor-pointer select-none"
                onClick={() => setShowDetail((d) => !d)}
                role="button"
                tabIndex={0}
                aria-expanded={showDetail}
              >
                <span className="font-semibold">Détail de l’article</span>
                <span className="font-bold text-xl ml-4">
                  {showDetail ? "–" : "+"}
                </span>
              </div>
              <AnimatePresence>
                {showDetail && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white text-[#4A4A4A] px-4 py-3 border border-[#89CFF0] rounded-b-md overflow-hidden"
                  >
              <div
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ProductDetail;
