import React from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';

const ShoppingCart = ({ onContinueShopping }) => {
  const { items: cartItems, loading, selectAllItems, removeCartItem, selectCartItem } = useCart();

  if (loading) {
    return (
      <div className="p-4 md:p-8 animate-pulse">
        {[1, 2].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg mb-4" />
        ))}
      </div>
    );
  }

  const handleDeleteSelected = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    for (const item of selectedItems) {
      await removeCartItem(item.id);
    }
  };

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8">
      <div className="flex items-center mb-2 md:mb-4 justify-between bg-[#eff9f9] p-2 md:p-3 rounded-lg border-2 border-[#55d5d2] w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => selectAllItems(e.target.checked)}
            className="w-4 h-4 mr-2"
          />
          <span>Chọn tất cả</span>
        </div>
        <button 
          onClick={handleDeleteSelected} 
          className="text-[#55d5d2] hover:text-red-500"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
      
      <div className="space-y-2 md:space-y-4 w-full">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onSelect={() => selectCartItem(item.id)}
          />
        ))}
      </div>

      <button 
        className="w-full sm:w-auto bg-white-200 border-2 border-[#55d5d2] text-black px-4 md:px-6 py-2 rounded-2xl"
        onClick={onContinueShopping}
      >
        Tiếp tục mua sắm
      </button>
    </div>
  );
};

export default ShoppingCart;