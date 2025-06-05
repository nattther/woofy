import { GraphQLClient, gql } from "graphql-request";
import type { Product, ProductsResponse } from "../type/product";

const endpoint = "http://localhost:3000/shop-api";
const client = new GraphQLClient(endpoint);

export async function fetchProducts(limit: number): Promise<Product[]> {
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
  const data = await client.request<ProductsResponse>(query, { take: limit });
  return data.products.items;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const query = gql`
    query GetProductBySlug($slug: String!) {
      product(slug: $slug) {
        id
        name
        slug
        description
        featuredAsset { preview }
        variants { id priceWithTax stockOnHand }
      }
    }
  `;
  const data = await client.request<{ product: Product | null }>(query, { slug });
  return data.product;
}
