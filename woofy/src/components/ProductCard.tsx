import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: string;
  slug: string;
}

/**
 * @description Card produit moderne avec effet hover/press animé, overlay textuel, et accessibilité renforcée.
 */
const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price, slug }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/produit/${slug}`);
  };

  return (
<motion.div
  className="max-w-xs mx-auto bg-white rounded-xl border border-[#89CFF0] transition-shadow duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#89CFF0]"
  tabIndex={0}
  role="button"
  aria-label={`Voir la fiche du produit ${title}`}
  onClick={goToDetail}
  onKeyDown={e => { if (e.key === "Enter") goToDetail(); }}
>
  {/* Image + Hover effect */}
  <div className="relative h-44 w-full bg-[#89CFF0] flex items-center justify-center group overflow-hidden">
    <img
      src={imageSrc}
      alt={`Photo du produit : ${title}`}
      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      style={{ minHeight: "90px" }}
      onError={e => {
        (e.target as HTMLImageElement).src = "/default-image.jpg";
      }}
      loading="lazy"
    />
        {/* Overlay, tout hauteur sur mobile */}
        <div
          className="
            absolute left-0 bottom-0 w-full 
            h-1/2 sm:h-1/2 
            flex items-center justify-center
            bg-black/40
            translate-y-full
            opacity-0
            group-hover:opacity-100 group-hover:translate-y-0
            group-focus:opacity-100 group-focus:translate-y-0
            transition-all duration-300
            sm:transition-all
            pointer-events-none
          "
        >
          <motion.span
            className="text-white text-base font-semibold tracking-wide"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            Voir produit
          </motion.span>
        </div>
      </div>
      {/* Infos */}
      <div className="p-4 flex flex-col flex-grow items-center">
        <h3 className="text-base font-semibold mb-1 text-[#4A4A4A] text-center line-clamp-2">{title}</h3>
        <p className="text-xs font-medium mt-1 text-[#4A4A4A] opacity-80">{price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
