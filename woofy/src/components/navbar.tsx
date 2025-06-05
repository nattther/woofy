import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

/**
 * @description Renders a single social‐icon image with a link.
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

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getTotalCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto grid grid-cols-3 items-center py-4 px-6">
        {/* Left: Social Icons */}
        <div className="flex space-x-4">
          <SocialLink href="https://facebook.com" src="/icons/facebook.png" alt="Facebook" />
          <SocialLink href="https://instagram.com" src="/icons/instagram.png" alt="Instagram" />
          <SocialLink href="https://pinterest.com" src="/icons/pinterest.png" alt="Pinterest" />
          <SocialLink href="https://twitter.com" src="/icons/twitter.png" alt="Twitter" />
        </div>

        {/* Center: Logo + Links */}
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img
              src="/icons/logo.png"
              alt="Woofy Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>
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

        {/* Right: Panier */}
        <div className="flex justify-end relative">
          <button
            type="button"
            className="relative"
            aria-label="Ouvrir le panier"
            onClick={() => setDrawerOpen(true)}
          >
            <img
              src="/icons/basket.png"
              alt="Panier"
              className="h-6 w-6 object-contain hover:opacity-80 transition"
            />
            {getTotalCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow font-bold animate-bounce">
                {getTotalCount()}
              </span>
            )}
          </button>
          <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
