
import React from "react";
import { Link } from "react-router-dom";

/**
 * @description Renders the Woofy footer with social icons and utility links.
 *              - Top row: Facebook & Instagram on the left, logo centered, Twitter & Pinterest on the right.
 *              - Bottom row: “FAQ” and “Nous contacter” spaced apart across 50% width, centered.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-6">
      {/* Conteneur principal */}
      <div className="container mx-auto flex flex-col items-center">

        {/* ─────────── Top Row: Icônes sociales + logo ─────────── */}
        <div className=" w-3/4 grid grid-cols-3 items-center mb-4">
          {/* Gauche: Facebook & Instagram */}
          <div className="flex justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/facebook.png"
                alt="Facebook"
                className="h-6 w-6 object-contain hover:opacity-80 transition"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/instagram.png"
                alt="Instagram"
                className="h-6 w-6 object-contain hover:opacity-80 transition"
              />
            </a>
          </div>

          {/* Centre: Logo rond (un peu plus grand) */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                src="/icons/logo.png"
                alt="Woofy Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
            </Link>
          </div>

          {/* Droite: Twitter & Pinterest */}
          <div className="flex justify-end space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/twitter.png"
                alt="Twitter"
                className="h-6 w-6 object-contain hover:opacity-80 transition"
              />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/pinterest.png"
                alt="Pinterest"
                className="h-6 w-6 object-contain hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>

        {/* ─────────── Bottom Row: FAQ & Nous contacter ─────────── */}
        <div className="w-1/2 flex justify-between text-sm text-gray-600 mx-auto">
          <Link to="/faq" className="hover:text-gray-800">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-gray-800">
            Nous contacter
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
