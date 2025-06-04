
import React from "react";

/**
 * @description Hero section with a full-screen background image and a dark overlay
 *              covering the bottom third, containing the headline text.
 * @returns A JSX element that fills the viewport height.
 */
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 1) Full-screen background image */}
      <img
        src="../assets/icons/hero.jpg"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 2) Dark overlay on bottom 1/3 */}
      <div className="absolute bottom-0 w-full h-1/3 bg-black/60" />

      {/* 3) Centered text inside the overlay */}
      <div className="absolute bottom-0 w-full h-1/3 flex items-center justify-center px-4">
        <h1 className="text-center text-white text-4xl sm:text-5xl font-semibold">
          Un cadeau pour votre meilleur ami
        </h1>
      </div>
    </section>
  );
};

export default Hero;
