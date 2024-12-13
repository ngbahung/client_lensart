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
      updateCartItems,
      setCartItemsCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;