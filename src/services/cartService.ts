import type { MenuItem } from "../components/menu/types/menu";
import type { CartItem } from "../components/layout/CartContextInstance";

/**
 * Cart Service (Sprint 3 - T.2 - Yunfei)
 * Business logic only:
 * - how items are added/updated/removed
 * - how totals are calculated
 * No React state, no data access.
 */
export const cartService = {
  addItem(cartItems: CartItem[], item: MenuItem): CartItem[] {
    const existing = cartItems.find((i) => i.id === item.id);

    if (existing) {
      return cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }

    return [...cartItems, { ...item, quantity: 1 }];
  },

  updateQuantity(cartItems: CartItem[], itemId: number, delta: number): CartItem[] {
    return cartItems
      .map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
      )
      .filter((i) => i.quantity > 0);
  },

  removeItem(cartItems: CartItem[], itemId: number): CartItem[] {
    return cartItems.filter((i) => i.id !== itemId);
  },

  getCartCount(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  },

  getTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
};
