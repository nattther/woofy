import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
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
          className="bg-[#89CFF0] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#77bfe0] transition text-lg font-bold"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
        >
          Achetez
        </motion.button>
      </motion.div>

      {/* Scroll down indicator (animated) */}
      <motion.div
        className="absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-white text-sm mb-1 opacity-80">Scrollez</span>
        <motion.div
          className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
          animate={{
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 7v10M12 17l-4-4m4 4l4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
