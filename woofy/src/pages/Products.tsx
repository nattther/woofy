import React, { useState } from "react";
import ProductFilterBar from "../components/ProductFilterBar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import type { ProductSort } from "../type/product";

const PRODUCTS_PER_PAGE = 8;

const Products: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSort>("NAME_ASC");

  const { products, total, loading } = usePaginatedProducts(page, PRODUCTS_PER_PAGE, sort);

  const pageCount = Math.ceil(total / PRODUCTS_PER_PAGE);

  // Si changement de tri, on revient à la page 1
  const handleSortChange = (newSort: ProductSort) => {
    setSort(newSort);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#4A4A4A]">
      <main className="container mx-auto py-10 flex-1">
        <ProductFilterBar sort={sort} onSortChange={handleSortChange} />
        {loading ? (
          <div className="text-center py-20">Chargement…</div>
        ) : (
          <>
            <ProductGrid products={products} />
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
