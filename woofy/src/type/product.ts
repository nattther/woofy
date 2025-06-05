/**
 * @description Strict typing for a Vendure product as returned by the shop API.
 */
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

export interface ProductsResponse {
  products: {
    items: Product[];
  };
}
