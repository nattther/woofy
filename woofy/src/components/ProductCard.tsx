import React from "react";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: string;
  slug: string;
}

/**
 * @description Card produit avec effet hover: overlay demi-hauteur, texte centré, opacité forte.
 */
const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price, slug }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/produit/${slug}`);
  };

  return (
    <div
      className="max-w-xs bg-white rounded-xl border transition-shadow duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ borderColor: "#F5F0E6" }}
    >
      {/* Image + Hover effect */}
      <div
        className="relative h-44 w-full bg-[#F5F0E6] flex items-center justify-center group overflow-hidden cursor-pointer"
        onClick={goToDetail}
      >
        <img
          src={imageSrc}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ minHeight: "90px" }}
          onError={e => {
            (e.target as HTMLImageElement).src = "/default-image.jpg";
          }}
        />
        {/* Overlay demi-hauteur, texte centré, opacité + forte */}
        <div
          className="absolute left-0 bottom-0 w-full h-1/2 
            flex items-center justify-center
            bg-black/40
            translate-y-full
            opacity-0
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300"
        >
          <span className="text-white text-base font-semibold tracking-wide">
            Voir produit
          </span>
        </div>
      </div>
      {/* Infos */}
      <div className="p-4 flex flex-col flex-grow items-center">
        <h3 className="text-base font-semibold mb-1 text-[#4A4A4A]">{title}</h3>
        <p className="text-xs font-medium mt-1 text-[#4A4A4A] opacity-80">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
