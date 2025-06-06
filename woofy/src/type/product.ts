/**
 * Product interface as returned by Vendure.
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredAsset?: { preview: string };
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

export type ProductSort =
  | "NAME_ASC"
  | "NAME_DESC"
  | "PRICE_ASC"
  | "PRICE_DESC";
