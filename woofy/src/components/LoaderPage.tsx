import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderPageProps {
  show: boolean;
}

const LoaderPage: React.FC<LoaderPageProps> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Logo tournant puis zoom-out */}
        <motion.img
          src="/icons/logo.png"
          alt="Woofy Logo"
          className="h-20 w-20 md:h-32 md:w-32 rounded-full"
          initial={{ rotate: 0, scale: 1 }}
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          exit={{ scale: 18, opacity: 0, transition: { duration: 0.8 } }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.2,
            ease: "linear",
          }}
          style={{ zIndex: 10000 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoaderPage;
