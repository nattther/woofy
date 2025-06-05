// src/components/Hero.tsx

import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Image de fond (dans public/icons/hero.jpg) */}
      <img
        src="/icons/hero.jpg"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay sombre sur le bas 1/3 */}
      <div className="absolute bottom-0 w-full h-1/3 bg-black/60" />

      {/* Texte + bouton centré dans le bandereau sombre */}
      <div className="absolute bottom-0 w-full h-1/3 flex flex-col items-center justify-center px-4 space-y-4">
        <h1 className="text-center text-white text-4xl sm:text-5xl font-semibold">
          Un cadeau pour votre meilleur ami
        </h1>
        <button className="bg-[#89CFF0] text-white px-6 py-2 rounded-lg hover:bg-[#77bfe0] transition">
          Achetez
        </button>
      </div>
    </section>
  );
};

export default Hero;
