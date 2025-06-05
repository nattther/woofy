/**
 * Product interface as returned by Vendure.
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredAsset: {
    preview: string;
  } | null;
  variants: Array<{
    id?: string;
    priceWithTax: number;
    stockOnHand?: number;
  }>;
}

export interface ProductsResponse {
  products: {
    items: Product[];
  };
}
