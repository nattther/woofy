import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../api/useproduct";

/**
 * @description Displays a featured canine section with 4 product cards fetched from Vendure.
 */
const FeaturedCanine: React.FC = () => {
  const { products, loading, error } = useProducts(4);

  if (loading) {
    return <p className="text-center">Chargement des produits…</p>;
  }
  if (error) {
    return <p className="text-center text-red-600">Erreur : {error}</p>;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Nos stars des canins
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageSrc={product.featuredAsset?.preview ?? "/default-image.jpg"}
            title={product.name}
            price={`${(product.variants[0]?.priceWithTax / 100).toFixed(2)} €`}
            slug={product.slug}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-[#89CFF0] text-white px-6 py-2 rounded-lg hover:bg-[#77bfe0] transition">
          Voir plus
        </button>
      </div>
    </section>
  );
};

export default FeaturedCanine;
