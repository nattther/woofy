// src/components/ProductCard.tsx

import React from "react";

interface ProductCardProps {
  /** URL or path to the product’s image */
  imageSrc: string;
  /** The product’s title or name */
  title: string;
  /** The product’s price, already formatted as a string */
  price: string;
}

/**
 * @description A simple card showing a product image, title, and price.
 *              Image covers the top; title and price sit underneath.
 */
const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* 1) Product image */}
      <div className="h-48 w-full">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 2) Title and price */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
