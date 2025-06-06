import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate("/products");
  };

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Hero Background with zoom/scale animation */}
      <motion.img
        src="/icons/hero.jpg"
        alt="Un chien heureux joue dans l’herbe, ambiance chaleureuse"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Dark overlay on bottom third */}
      <div className="absolute bottom-0 w-full h-1/3 bg-black/60 pointer-events-none" />

      {/* Animated Text + Button */}
      <motion.div
        className="absolute bottom-0 w-full h-1/3 flex flex-col items-center justify-center px-4 space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h1 className="text-center text-white text-4xl sm:text-5xl font-semibold drop-shadow-lg">
          Un cadeau pour votre meilleur ami
        </h1>
        <motion.button
          onClick={handleBuyClick}
          className="bg-[#89CFF0] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#77bfe0] transition text-lg font-bold"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Aller à la page Produits"
        >
          Achetez
        </motion.button>
      </motion.div>

    </section>
  );
};

export default Hero;
