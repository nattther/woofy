import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
      className="h-8 w-8 md:h-10 md:w-10 object-contain hover:opacity-80 transition"
    />
  </a>
);

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getTotalCount } = useCart();

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
  <div className="container mx-auto grid grid-cols-3 items-center py-4 px-6">
    {/* Left: Social Icons (hidden below md) */}
    <div className="hidden md:flex space-x-4">
      <SocialLink href="https://facebook.com" src="/icons/facebook.png" alt="Facebook" />
      <SocialLink href="https://instagram.com" src="/icons/instagram.jpg" alt="Instagram" />
      <SocialLink href="https://pinterest.com" src="/icons/pinterest.png" alt="Pinterest" />
      <SocialLink href="https://twitter.com" src="/icons/twitter.png" alt="Twitter" />
    </div>
    {/* Placeholder for symmetry when social icons are hidden */}
    <div className="md:hidden" />

    {/* Center: Logo + Links */}
    <div className="flex flex-col items-center">
      <Link to="/">
        <img
          src="/icons/logo.png"
          alt="Woofy Logo"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full"
        />
      </Link>
<div className="mt-1 flex flex-col items-center text-xs md:flex-row md:text-sm text-gray-600">
  <NavLink
    to="/"
    end
    className={({ isActive }) =>
      isActive
        ? "font-bold underline text-[#89CFF0] transition"
        : "hover:text-gray-800"
    }
  >
    Accueil
  </NavLink>
  <span className="hidden md:inline mx-2">|</span>
  <NavLink
    to="/products"
    className={({ isActive }) =>
      isActive
        ? "font-bold underline text-[#89CFF0] transition"
        : "hover:text-gray-800 mt-1 md:mt-0 md:ml-2"
    }
  >
    Produits
  </NavLink>
</div>
    </div>

    {/* Right: Cart */}
    <div className="flex justify-end relative">
      <button
        type="button"
        className="relative"
        aria-label="Ouvrir le panier"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16 group rounded-full overflow-hidden">
          <img
            src="/icons/basket.jpg"
            alt="Panier"
            className="w-full h-full object-contain transition-transform group-hover:scale-105"
          />
          <div className="
            absolute inset-0 
            bg-[#C1E1C1] 
            opacity-0 
            rounded-full 
            transition-opacity 
            group-hover:opacity-50
          "></div>
        </div>
        {getTotalCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow font-bold animate-bounce">
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
