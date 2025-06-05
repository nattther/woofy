import React from "react";
import type { ProductCardProps } from "../type/productCard";



/**
 * @description Product card with contained image, custom border color, 
 *              clear hierarchy, and site-wide color rules.
 */
const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price }) => (
  <div
    className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden flex flex-col border"
    style={{ borderColor: "#F5F0E6" }}
  >
    {/* Product image */}
    <div className="h-44 w-full bg-[#F5F0E6] flex items-center justify-center">
      <img
        src={imageSrc}
        alt={title}
        className="max-h-full max-w-full object-contain"
        style={{ minHeight: "90px" }}
        onError={e => {
          (e.target as HTMLImageElement).src = "/default-image.jpg";
        }}
      />
    </div>
    {/* Title and price */}
    <div className="p-4 flex flex-col flex-grow items-center">
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-xs font-medium mt-1 text-[#4A4A4A] opacity-80">{price}</p>
    </div>
  </div>
);

export default ProductCard;
