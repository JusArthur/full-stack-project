import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { MenuItem } from '../menu/types/menu';

// Extend MenuItem to include quantity
export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((zi) => zi.id === item.id);
      if (existingItem) {
        return prevItems.map((zi) =>
          zi.id === item.id ? { ...zi, quantity: zi.quantity + 1 } : zi
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate total number of items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}