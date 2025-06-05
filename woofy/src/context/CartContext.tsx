import { createContext, useContext, useState, type ReactNode } from "react";
import type { Cart, CartItem } from "../type/cart";
import type { Product } from "../type/product";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev: Cart) => {
      const exist = prev.items.find((i: CartItem) => i.product.id === product.id);
      if (exist) {
        return {
          items: prev.items.map((i: CartItem) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...prev.items, { product, quantity }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev: Cart) => ({
      items: prev.items.filter((i: CartItem) => i.product.id !== productId),
    }));
  };

  const clearCart = () => setCart({ items: [] });

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev: Cart) => ({
      items: prev.items.map((i: CartItem) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    }));
  };

  const getTotalCount = () => cart.items.reduce((acc, i) => acc + i.quantity, 0);

  const getTotalPrice = () =>
    cart.items.reduce(
      (acc, i) => acc + i.quantity * (i.product.variants[0]?.priceWithTax ?? 0),
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
