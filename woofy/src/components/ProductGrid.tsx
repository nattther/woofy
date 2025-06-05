import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../type/product";


interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    {products.map(product => (
      <ProductCard
        key={product.id}
        imageSrc={product.featuredAsset?.preview ?? "/default-image.jpg"}
        title={product.name}
        price={`${(product.variants[0]?.priceWithTax / 100).toFixed(2)} €`}
        slug={product.slug}
      />
    ))}
  </div>
);

export default ProductGrid;
