import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import Navbar from "./navbar";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";


interface AppLoaderWrapperProps {
  children: React.ReactNode;
}

/**
 * Affiche le loader Woofy à chaque navigation + chargement initial.
 */
const AppLoaderWrapper: React.FC<AppLoaderWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Re-affiche le loader à chaque changement d'URL

    const fetchData = async () => {
      // Place ici tes appels d'API éventuels liés à la page
      await new Promise(resolve => setTimeout(resolve, 400)); // Simule chargement API
    };
    const minTime = new Promise(resolve => setTimeout(resolve, 1000)); // Loader mini 1s

    Promise.all([fetchData(), minTime]).then(() => setLoading(false));

    // Clean up si tu veux annuler un fetch long (optionnel)
  }, [location]);

  return (
    <>
      <LoaderPage show={loading} />
      <Navbar />


{/* ...dans le return... */}
<main className="pt-20">
  <AnimatePresence mode="wait">
    {!loading && (
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
</main>

      <Footer />
    </>
  );
};

export default AppLoaderWrapper;
