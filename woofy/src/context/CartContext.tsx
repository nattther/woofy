/* eslint-disable @typescript-eslint/no-explicit-any */
// context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { vendureFetch } from "../api/vendure";
import type { Cart } from "../type/cart";
import type { Product } from "../type/product";

// ---- GraphQL ----
const GET_ACTIVE_ORDER = `query { activeOrder { id state lines { id quantity productVariant { id name priceWithTax featuredAsset { preview } product { featuredAsset { preview } } } } totalWithTax } }`;
const ADD_ITEM_TO_ORDER = `mutation ($productVariantId: ID!, $quantity: Int!) { addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) { ... on Order { id state lines { id quantity productVariant { id name priceWithTax featuredAsset { preview } product { featuredAsset { preview } } } } totalWithTax } ... on ErrorResult { message } } }`;
const REMOVE_ORDER_LINE = `mutation ($orderLineId: ID!) { removeOrderLine(orderLineId: $orderLineId) { ... on Order { id lines { id quantity productVariant { id name priceWithTax } } totalWithTax } ... on ErrorResult { message } } }`;
const ADJUST_ORDER_LINE = `mutation ($orderLineId: ID!, $quantity: Int!) { adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) { ... on Order { id lines { id quantity productVariant { id name priceWithTax } } totalWithTax } ... on ErrorResult { message } } }`;
const CLEAR_CART = `mutation { transitionOrderToState(state: "Cancelled") { ... on Order { id } ... on OrderStateTransitionError { message } } }`;

// ---- Helpers ----
function fromVendureOrderToCart(order: any): Cart {
  if (!order) return { items: [] };
  return {
    items: order.lines.map((l: any) => {
      const asset = l.productVariant.featuredAsset ?? l.productVariant.product.featuredAsset;
      return {
        product: {
          id: l.productVariant.id,
          name: l.productVariant.name,
          variants: [{ id: l.productVariant.id, priceWithTax: l.productVariant.priceWithTax }],
          featuredAsset: asset,
        },
        orderLineId: l.id,
        quantity: l.quantity,
      };
    }),
  };
}

// ---- Context & Provider ----
interface CartContextType {
  cart: Cart;
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (orderLineId: string) => Promise<void>;
  updateQuantity: (orderLineId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalCount: () => number;
  getTotalPrice: () => number;
  orderState: string | null;
  vendureOrderId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [vendureOrderId, setVendureOrderId] = useState<string | null>(null);
  const [orderState, setOrderState] = useState<string | null>(null);

  const fetchCart = async () => {
    const data = await vendureFetch(GET_ACTIVE_ORDER);
    setVendureOrderId(data.activeOrder?.id ?? null);
    setOrderState(data.activeOrder?.state ?? null);
    setCart(fromVendureOrderToCart(data.activeOrder));
  };

  useEffect(() => { fetchCart(); }, []);

  const addToCart = async (product: Product, quantity: number) => {
    const variantId = product.variants[0]?.id;
    if (!variantId) throw new Error("No variant ID");
    await vendureFetch(ADD_ITEM_TO_ORDER, { productVariantId: variantId, quantity });
    await fetchCart();
  };

  const removeFromCart = async (orderLineId: string) => {
    await vendureFetch(REMOVE_ORDER_LINE, { orderLineId });
    await fetchCart();
  };

  const updateQuantity = async (orderLineId: string, quantity: number) => {
    await vendureFetch(ADJUST_ORDER_LINE, { orderLineId, quantity });
    await fetchCart();
  };

  const clearCart = async () => {
    await vendureFetch(CLEAR_CART);
    await fetchCart();
  };

  const getTotalCount = () => cart.items.reduce((acc, i) => acc + i.quantity, 0);
  const getTotalPrice = () => cart.items.reduce((acc, i) => acc + i.quantity * (i.product.variants[0]?.priceWithTax ?? 0), 0);

  return (
    <CartContext.Provider value={{
      cart, fetchCart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalCount, getTotalPrice, orderState, vendureOrderId
    }}>
      {children}
    </CartContext.Provider>
  );
};
