import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F0E6] border-t border-[#C1E1C1] pt-10 pb-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Top Row: Social icons + logo */}
        <div className="
          w-full max-w-3xl 
          grid grid-cols-3 items-center 
          mb-8
          gap-x-6 sm:gap-x-12 xl:gap-x-20
        ">
          {/* Left: Facebook & Instagram */}
          <div className="flex justify-start gap-4 sm:gap-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Woofy sur Facebook"
              className="focus:outline-none focus:ring-2 focus:ring-[#89CFF0] rounded-full"
            >
              <div className=" p-2 rounded-full shadow hover:bg-[#77bfe0] transition">
                <img
                  src="/icons/facebook.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </div>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Woofy sur Instagram"
              className="focus:outline-none focus:ring-2 focus:ring-[#89CFF0] rounded-full"
            >
              <div className=" p-2 rounded-full shadow hover:bg-[#77bfe0] transition">
                <img
                  src="/icons/instagram.jpg"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </div>
            </a>
          </div>
          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link to="/" aria-label="Accueil Woofy">
              <img
                src="/icons/logo.png"
                alt="Woofy Logo"
                className="h-16 w-16 rounded-full object-cover shadow-md border border-[#89CFF0]"
              />
            </Link>
          </div>
          {/* Right: Twitter & Pinterest */}
          <div className="flex justify-end gap-4 sm:gap-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Woofy sur Twitter"
              className="focus:outline-none focus:ring-2 focus:ring-[#89CFF0] rounded-full"
            >
              <div className=" p-2 rounded-full shadow hover:bg-[#77bfe0] transition">
                <img
                  src="/icons/twitter.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </div>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Woofy sur Pinterest"
              className="focus:outline-none focus:ring-2 focus:ring-[#89CFF0] rounded-full"
            >
              <div className=" p-2 rounded-full shadow hover:bg-[#77bfe0] transition">
                <img
                  src="/icons/pinterest.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </div>
            </a>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full max-w-3xl border-t border-[#C1E1C1] my-6" />

        {/* Bottom Row: FAQ & Contact, responsive, bien espacé */}
        <div className="
          w-full max-w-md 
          flex flex-col sm:flex-row 
          justify-center items-center 
          gap-y-2 sm:gap-y-0 
          gap-x-0 sm:gap-x-12 md:gap-x-20 
          text-sm text-gray-700 mt-2
        ">
          <Link to="/faq" className="hover:text-[#89CFF0] focus:outline-none focus:text-[#89CFF0]">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-[#89CFF0] focus:outline-none focus:text-[#89CFF0]">
            Nous contacter
          </Link>
        </div>

        {/* Copyright */}
        <div className="w-full max-w-3xl mt-8 text-xs text-center text-gray-500 opacity-70">
          © {new Date().getFullYear()} Woofy. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
