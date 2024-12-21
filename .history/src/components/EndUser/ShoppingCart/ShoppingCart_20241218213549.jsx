import React from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';

const ShoppingCart = ({ onContinueShopping }) => {
  const { items: cartItems, selectAllItems, removeCartItem, selectCartItem, total } = useCart();

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
      
      <div className="space-y-2 md:space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onSelect={() => selectCartItem(item.id)}
          />
        ))}
      </div>
      
      <div className="mt-4 space-y-2 flex gap-2">
        <button 
          className="flex-1 bg-[#55d5d2] text-white px-4 py-2 rounded-2xl"
          onClick={onContinueShopping}
        >
          Tiếp tục mua sắm
        </button>
        
        {cartItems.some(item => item.selected) && (
          <button 
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-2xl"
            onClick={() => {/* handle checkout */}}
          >
            Tiến hành thanh toán
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;