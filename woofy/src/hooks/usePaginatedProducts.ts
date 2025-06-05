import { useEffect, useState } from "react";
import { fetchPaginatedProducts } from "../api/productApi";
import type { ProductSort, Product } from "../type/product";

export function usePaginatedProducts(
  page: number,
  perPage: number,
  sort: ProductSort
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPaginatedProducts(page, perPage, sort)
      .then(({ items, totalItems }) => {
        setProducts(items);
        setTotal(totalItems);
      })
      .finally(() => setLoading(false));
  }, [page, perPage, sort]);

  return { products, total, loading };
}
