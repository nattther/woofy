import { FaSortAlphaDown, FaSortAmountDown } from "react-icons/fa";
import type { ProductSort } from "../type/product";

interface ProductFilterBarProps {
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
}

const sortOptions = [
  { value: "NAME_ASC", label: "A-Z", icon: <FaSortAlphaDown /> },
  { value: "NAME_DESC", label: "Z-A", icon: <FaSortAlphaDown className="rotate-180" /> },
  { value: "PRICE_ASC", label: "Prix croissant", icon: <FaSortAmountDown /> },
  { value: "PRICE_DESC", label: "Prix décroissant", icon: <FaSortAmountDown className="rotate-180" /> },
];

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ sort, onSortChange }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">

    {/* Filtre tri avec icône */}
    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
      <span className="hidden sm:inline text-sm text-gray-500 font-medium mr-2">Trier :</span>
      <select
        className="bg-white border border-[#89CFF0] px-3 py-2 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#89CFF0] transition"
        value={sort}
        onChange={e => onSortChange(e.target.value as ProductSort)}
      >
        {sortOptions.map(option => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  </div>
);

export default ProductFilterBar;
