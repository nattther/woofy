import { GraphQLClient, gql } from "graphql-request";
import type { Product, ProductSort, ProductsResponse } from "../type/product";

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

/**
 * Fetches paginated & sorted products.
 */
export async function fetchPaginatedProducts(
  page: number,
  perPage: number,
  sort: ProductSort = "NAME_ASC"
): Promise<{ items: Product[]; totalItems: number }> {
  // Vendure utilise 'skip' (offset) et 'take' (limit), et l'option 'sort'
  let sortObj: Record<string, "ASC" | "DESC"> = {};
  if (sort === "NAME_ASC") sortObj = { name: "ASC" };
  if (sort === "NAME_DESC") sortObj = { name: "DESC" };
  if (sort === "PRICE_ASC") sortObj = { price: "ASC" };
  if (sort === "PRICE_DESC") sortObj = { price: "DESC" };

  const query = gql`
    query GetPaginatedProducts($skip: Int!, $take: Int!, $sort: ProductSortParameter) {
      products(options: { skip: $skip, take: $take, sort: $sort }) {
        items {
          id
          name
          slug
          featuredAsset { preview }
          variants { priceWithTax }
        }
        totalItems
      }
    }
  `;
  const variables = {
    skip: (page - 1) * perPage,
    take: perPage,
    sort: sortObj,
  };

  const data = await client.request<{
    products: { items: Product[]; totalItems: number };
  }>(query, variables);

  return data.products;
}