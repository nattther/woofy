import type { Product } from "./product";


/** Un item du panier */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Structure globale du panier */
export interface Cart {
  items: CartItem[];
}
