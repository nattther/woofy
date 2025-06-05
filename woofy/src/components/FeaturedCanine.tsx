
import React from "react";
import ProductCard from "./ProductCard.tsx";

interface CanineProduct {
  imageSrc: string;
  title: string;
  price: string;
}

/**
 * @description Section “Nos star des canin” avec 4 ProductCard alignées, 
 *              puis un bouton bleu “Voir plus” centré en dessous.
 */
const FeaturedCanine: React.FC = () => {
  // Exemple de 4 produits. Ajustez les chemins d'image, titres et prix comme bon vous semble.
  const products: CanineProduct[] = [
    {
      imageSrc: "/icons/dog1.jpg",
      title: "Jouet peluche Corgi",
      price: "14,99 €",
    },
    {
      imageSrc: "/icons/dog2.jpg",
      title: "Nourriture premium Labrador",
      price: "29,50 €",
    },
    {
      imageSrc: "/icons/dog3.jpg",
      title: "Panier moelleux Beagle",
      price: "39,00 €",
    },
    {
      imageSrc: "/icons/dog4.jpg",
      title: "Collier réglable Husky",
      price: "19,90 €",
    },
  ];

  return (
    <section className="py-8">
      {/* Titre centré */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Nos star des canin
      </h2>

      {/* Grille 4 cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((prod, idx) => (
          <ProductCard
            key={idx}
            imageSrc={prod.imageSrc}
            title={prod.title}
            price={prod.price}
          />
        ))}
      </div>

      {/* Bouton “Voir plus” centré en dessous */}
      <div className="flex justify-center mt-8">
        <button className="bg-[#89CFF0] text-white px-6 py-2 rounded-lg hover:bg-[#77bfe0] transition">
          Voir plus
        </button>
      </div>
    </section>
  );
};

export default FeaturedCanine;
