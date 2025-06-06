import React from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../type/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-10">
    <AnimatePresence>
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ delay: idx * 0.07, duration: 0.5 }}
        >
          <ProductCard
            imageSrc={product.featuredAsset?.preview ?? "/default-image.jpg"}
            title={product.name}
            price={`${(product.variants[0]?.priceWithTax / 100).toFixed(2)} €`}
            slug={product.slug}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ProductGrid;
