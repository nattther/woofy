import React from "react";

const HeroProduct: React.FC = () => (
  <section className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden mb-8">
    {/* Image de fond spécifique page produits */}
    <img
      src="/icons/hero-products.jpg" // ← change l’image ici!
      alt="Groupe de chiens heureux"
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />

    {/* Overlay pour lisibilité */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-white/0" />

    {/* Slogan centré */}
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-xl">
        L’ami de mon ami est mon ami
        <span className="block h-1 w-2/3 mx-auto bg-gradient-to-r from-[#89CFF0] to-[#67aedd] rounded-full mt-4 opacity-80" />
      </h1>
    </div>
  </section>
);

export default HeroProduct;
