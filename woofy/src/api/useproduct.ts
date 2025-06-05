import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import type { Product, ProductsResponse } from "../type/product.ts";

/**
 * Custom hook to fetch a limited number of products from the Vendure API.
 * @param limit The number of products to fetch.
 * @returns { products, loading, error }
 */
export function useProducts(limit = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = "http://localhost:3000/shop-api";
    const client = new GraphQLClient(endpoint);

    const query = gql`
      query GetProducts($take: Int!) {
        products(options: { take: $take }) {
          items {
            id
            name
            slug
            featuredAsset { preview }
            variants { priceWithTax }
          }
        }
      }
    `;

    client
      .request<ProductsResponse>(query, { take: limit })
      .then(data => {
        setProducts(data.products.items);
      })
      .catch(err => {
        // Vendure renvoie souvent des erreurs sous err.response.errors
        setError(err?.response?.errors?.[0]?.message || err.message || "Erreur inconnue");
      })
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading, error };
}
