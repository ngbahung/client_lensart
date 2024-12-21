
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}