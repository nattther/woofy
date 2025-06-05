import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/productApi";
import type { Product } from "../type/product.ts";
import { useCart } from "../context/CartContext";


const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    console.log("Slug reçu :", slug);
    fetchProductBySlug(slug)
      .then((prod) => {
        console.log("Produit récupéré :", prod);
        setProduct(prod);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du produit :", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);
  const { addToCart } = useCart();
  if (loading) {
    return <div className="text-center mt-20">Chargement…</div>;
  }
  if (!product) {
    return (
      <div className="text-center mt-20 text-red-600">
        Produit introuvable
      </div>
    );
  }



const addToCartHandler = () => {
  if (!product) return;
  addToCart(product, quantity);
  // Optionnel : toast/animation “ajouté au panier”
};

  const variant = product.variants[0];
  const maxStock = variant?.stockOnHand ?? 0;

  const increment = () =>
    setQuantity((q) => (q < maxStock ? q + 1 : q));
  const decrement = () =>
    setQuantity((q) => (q > 1 ? q - 1 : q));


  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#4A4A4A]">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image à gauche */}
          <div className="flex-1 flex items-center justify-center bg-white rounded-xl p-6 shadow-md min-h-[420px]">
            <img
              src={product.featuredAsset?.preview ?? "/default-image.jpg"}
              alt={product.name}
              className="object-contain max-h-96 w-full"
            />
          </div>

          {/* Infos produit à droite */}
          <div className="flex-1 flex flex-col justify-start">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="text-2xl font-semibold mb-6">
              {(variant.priceWithTax / 100).toFixed(2)} €
            </div>

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
            <button
              onClick={addToCartHandler}
              className="w-full bg-[#C1E1C1] hover:bg-green-200 text-[#4A4A4A] font-bold py-3 rounded-lg transition mb-6 shadow"
            >
              Ajouter au panier
            </button>

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
              {showDetail && (
                <div className="bg-white text-[#4A4A4A] px-4 py-3 border border-[#89CFF0] rounded-b-md transition-all">
                  {product.description}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
