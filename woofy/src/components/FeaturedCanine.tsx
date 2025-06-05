// src/components/FeaturedCanine.tsx

import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import ProductCard from "./ProductCard";

export interface Product {
  id: string;
  name: string;
  slug: string;
  featuredAsset: {
    preview: string;
  } | null;
  variants: {
    priceWithTax: number;
  }[];
}

// Réponse de la requête GraphQL
export interface ProductsResponse {
  products: {
    items: Product[];
  };
}
const FeaturedCanine: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const endpoint = "http://localhost:3000/shop-api";
      const client = new GraphQLClient(endpoint);

      // 1) Définir la requête GraphQL
      const query = gql`
        query GetProducts {
          products(options: { take: 4 }) {
            items {
              id
              name
              slug
              featuredAsset {
                preview
              }
              variants {
                priceWithTax
              }
            }
          }
        }
      `; // 

      try {
        // 2) Appeler client.request<ProductsResponse> pour typer correctement le retour
        const data = await client.request<ProductsResponse>(query);
        // data est maintenant de type ProductsResponse (pas unknown) 
        setProducts(data.products.items);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Erreur lors de la récupération des produits :", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Chargement des produits…</p>;
  }
  if (error) {
    return <p className="text-center text-red-600">Erreur : {error}</p>;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Nos stars des canins
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageSrc={
              product.featuredAsset?.preview ?? "/default-image.jpg"
            }
            title={product.name}
            // priceWithTax est en cents, division par 100 pour obtenir en euros
            price={`${(product.variants[0]?.priceWithTax / 100).toFixed(
              2
            )} €`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-[#89CFF0] text-white px-6 py-2 rounded-lg hover:bg-[#77bfe0] transition">
          Voir plus
        </button>
      </div>
    </section>
  );
};

export default FeaturedCanine;
