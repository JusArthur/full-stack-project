import { useState } from "react";
import type { ReactNode } from "react";
import type { MenuItem } from "../menu/types/menu";
import { cartService } from "../../services/cartService";
import { CartContext, type CartItem } from "./CartContextInstance";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const clearCart = () => {
    setCartItems([]);
  };
  const cartCount = cartService.getCartCount(cartItems);
  const totalPrice = cartService.getTotalPrice(cartItems);
  /**
   * Sprint 3 (I.3/T.2 - Yunfei)
   * Cart business logic lives in cartService (add/update/remove/totals).
   * Why: keeps cart rules reusable and testable outside React components.
   * Context remains responsible for state storage and UI triggers (e.g., open drawer).
   */
  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => cartService.addItem(prev, item));
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCartItems((prev) => cartService.updateQuantity(prev, itemId, delta));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => cartService.removeItem(prev, itemId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, 
        isCartOpen,
        setIsCartOpen,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
