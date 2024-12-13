import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const updateCartItems = (items) => {
    setCartItems(items);
    setCartItemsCount(items.reduce((total, item) => total + item.quantity, 0));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartItemsCount, 
      setCartItemsCount,
      updateCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
}