import { GraphQLClient, gql } from "graphql-request";
import type { Product, ProductSort, ProductsResponse } from "../type/product";
interface SearchResultItem {
  productId: string;
  productName: string;
  slug: string;
  productAsset?: {
    preview: string;
  };
  priceWithTax?: {
    value?: number;
    min?: number;
  };
}

interface SearchResponse {
  search: {
    items: SearchResultItem[];
    totalItems: number;
  };
}


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


export async function fetchPaginatedProducts(
  page: number,
  perPage: number,
  sort: ProductSort = "NAME_ASC"
): Promise<{ items: Product[]; totalItems: number }> {
  const sortMap: Record<ProductSort, { name?: 'ASC' | 'DESC'; price?: 'ASC' | 'DESC' }> = {
    NAME_ASC: { name: 'ASC' },
    NAME_DESC: { name: 'DESC' },
    PRICE_ASC: { price: 'ASC' },
    PRICE_DESC: { price: 'DESC' },
  };

  const query = gql`
    query SearchProducts($input: SearchInput!) {
      search(input: $input) {
        items {
          productId
          productName
          slug
          productAsset {
            preview
          }
          priceWithTax {
            ... on SinglePrice {
              value
            }
            ... on PriceRange {
              min
              max
            }
          }
        }
        totalItems
      }
    }
  `;

  const variables = {
    input: {
      take: perPage,
      skip: (page - 1) * perPage,
      sort: sortMap[sort],
    },
  };

const data = await client.request<SearchResponse>(query, variables);

  // Adapter les données reçues pour correspondre à votre type Product
if (
  typeof data === 'object' &&
  data !== null &&
  'search' in data &&
  typeof data.search === 'object' &&
  data.search !== null &&
  'items' in data.search &&
  Array.isArray(data.search.items)
) {
  const items: Product[] = data.search.items.map((item: SearchResultItem) => ({
    id: item.productId,
    name: item.productName,
    slug: item.slug,
    featuredAsset: {
      preview: item.productAsset?.preview || "/default-image.jpg",
    },
    variants: [
      {
        priceWithTax:
          item.priceWithTax?.value ??
          item.priceWithTax?.min ??
          0,
      },
    ],
  }));

  return {
    items,
    totalItems: data.search.totalItems,
  };
} else {
  // Gérer le cas où la structure de 'data' n'est pas celle attendue
  throw new Error("Structure de données inattendue");
}


}
