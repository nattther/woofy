import React from "react";
import type { ProductSort } from "../type/product";

interface ProductFilterBarProps {
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ sort, onSortChange }) => (
  <div className="flex items-center justify-between mb-6">
    {/* Slogan à gauche */}
    <h1 className="text-3xl font-bold text-[#4A4A4A]">
      L’ami de mon ami est mon ami
    </h1>
    {/* Trait + filtre à droite */}
    <div className="flex items-center">
      <hr className="hidden sm:block border-gray-300 border-t-2 w-24 mx-4" />
      <select
        className="bg-white border px-3 py-2 rounded-lg text-gray-700 text-sm"
        value={sort}
        onChange={e => onSortChange(e.target.value as ProductSort)}
      >
        <option value="NAME_ASC">A-Z</option>
        <option value="NAME_DESC">Z-A</option>
        <option value="PRICE_ASC">Prix croissant</option>
        <option value="PRICE_DESC">Prix décroissant</option>
      </select>
    </div>
  </div>
);

export default ProductFilterBar;
