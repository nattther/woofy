import { useEffect, useState } from "react";
import { fetchProducts, fetchProductBySlug } from "../api/productApi";
import type { Product } from "../type/product";

/**
 * Fetches multiple products
 */
export function useProducts(limit = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts(limit)
      .then(setProducts)
      .catch((err) =>
        setError(
          err?.response?.errors?.[0]?.message ||
            err.message ||
            "Erreur inconnue"
        )
      )
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading, error };
}

/**
 * Fetches a product by its slug.
 */
export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchProductBySlug(slug)
      .then(setProduct)
      .catch((err) =>
        setError(
          err?.response?.errors?.[0]?.message ||
            err.message ||
            "Erreur inconnue"
        )
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
}
