import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../api/useproduct";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @description Displays a featured canine section with 4 product cards fetched from Vendure.
 */
const FeaturedCanine: React.FC = () => {
  const { products, loading, error } = useProducts(4);

  // Skeleton Loader Card
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse h-64 flex flex-col items-center">
      <div className="w-32 h-32 bg-gray-200 rounded-md mb-4" />
      <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded" />
      <div className="h-4 bg-gray-100 w-1/2 rounded" />
    </div>
  );

  if (loading) {
    return (
      <section className="py-8" aria-live="polite">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Nos stars des canins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-8">
        <p className="text-center text-red-600">Erreur : {error}</p>
      </section>
    );
  }

  return (
<section className="py-8 mt-10 mb-10 ">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
    Nos stars des canins
  </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.5,
                type: "spring",
                bounce: 0.2,
              }}
            >
              <ProductCard
                imageSrc={product.featuredAsset?.preview ?? "/default-image.jpg"}
                title={product.name}
                price={`${(product.variants[0]?.priceWithTax / 100).toFixed(2)} €`}
                slug={product.slug}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="flex items-center gap-2 bg-[#89CFF0] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#77bfe0] active:scale-95 transition text-lg font-bold"
          aria-label="Voir plus de produits canins"
        >
          Voir plus
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className="ml-2"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FeaturedCanine;
