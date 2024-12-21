import React from 'react';
import { useCart } from '../../../contexts/CartContext';

const CartDebug = () => {
  const { items, loading, error } = useCart();

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 m-4 rounded-lg max-w-sm">
        <h3>Cart Debug Info:</h3>
        <pre className="text-xs">
          {JSON.stringify({ items, loading, error }, null, 2)}
        </pre>
      </div>
    );
  }

  return null;
};

export default CartDebug;
