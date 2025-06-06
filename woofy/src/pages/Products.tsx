import React, { useState, useEffect } from "react";
import ProductFilterBar from "../components/ProductFilterBar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import type { ProductSort } from "../type/product";
import HeroProduct from "../components/HeroProduct";

const PRODUCTS_PER_PAGE = 8;

const Products: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSort>("NAME_ASC");
  const [gridLoading, setGridLoading] = useState(false);

  const { products, total, loading } = usePaginatedProducts(page, PRODUCTS_PER_PAGE, sort);

  const pageCount = Math.ceil(total / PRODUCTS_PER_PAGE);

  // Affiche le loader grid à chaque changement de page/sort
  useEffect(() => {
    if (loading) {
      setGridLoading(true);
    } else {
      // On garde le loader au moins 600ms pour un effet smooth
      const t = setTimeout(() => setGridLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [loading]);

  // Quand on change le tri, on revient page 1
  const handleSortChange = (newSort: ProductSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // UX : remonte la page
  };

  return (
    <div className="flex flex-col min-h-screen  text-[#4A4A4A]">
      <HeroProduct />
      <main className="container mx-auto px-2 sm:px-4 py-10 flex-1">
        <ProductFilterBar sort={sort} onSortChange={handleSortChange} />

        {/* Loader Woofy uniquement sur la grille */}
        <div className="relative min-h-[380px]">
          {gridLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
              <img
                src="/icons/logo.png"
                alt="Woofy Logo"
                className="h-14 w-14 animate-spin"
              />
            </div>
          )}

          {!gridLoading && (
            <>
              <ProductGrid products={products} />
              <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
