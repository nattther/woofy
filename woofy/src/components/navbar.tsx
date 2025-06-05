// src/components/Navbar.tsx

import React from "react";
import { Link } from "react-router-dom";

/**
 * @description Renders a single social‐icon image with a link.
 * @param props.href URL to navigate to when clicked.
 * @param props.src  Path to the icon image.
 * @param props.alt  Accessible text for the image.
 */
interface SocialLinkProps {
  href: string;
  src: string;
  alt: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, src, alt }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src={src}
      alt={alt}
      className="h-6 w-6 object-contain hover:opacity-80 transition"
    />
  </a>
);

/**
 * @description Main navigation bar for Woofy. 
 * Left: social‐media image links.
 * Center: round logo image, with “Accueil | Produits” underneath.
 * Right: small cart image linking to /cart.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto grid grid-cols-3 items-center py-4 px-6">
        
        {/* ─────────── Left Column: Social Icons ─────────── */}
        <div className="flex space-x-4">
          <SocialLink
            href="https://facebook.com"
            src="/icons/facebook.png"
            alt="Facebook"
          />
          <SocialLink
            href="https://instagram.com"
            src="/icons/instagram.png"
            alt="Instagram"
          />
          <SocialLink
            href="https://pinterest.com"
            src="/icons/pinterest.png"
            alt="Pinterest"
          />
          <SocialLink
            href="https://twitter.com"
            src="/icons/twitter.png"
            alt="Twitter"
          />
        </div>

        {/* ─────────── Center Column: Logo + Sub‐nav ─────────── */}
        <div className="flex flex-col items-center justify-center">
          {/* Round Woofy Logo */}
          <Link to="/">
            <img
              src="/icons/logo.png"
              alt="Woofy Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>

          {/* “Accueil | Produits” links */}
          <div className="mt-1 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-800">
              Accueil
            </Link>
            <span className="mx-2">|</span>
            <Link to="/products" className="hover:text-gray-800">
              Produits
            </Link>
          </div>
        </div>

        {/* ─────────── Right Column: Cart Icon ─────────── */}
        <div className="flex justify-end">
          <Link to="/cart" className="inline-block">
            <img
              src="/icons/basket.png"
              alt="Panier"
              className="h-6 w-6 object-contain hover:opacity-80 transition"
            />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
