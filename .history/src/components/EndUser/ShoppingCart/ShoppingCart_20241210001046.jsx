import React from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";

const ShoppingCart = ({ cartItems, onUpdateCart, onContinueShopping, onCheckout, onSelectItem, onSelectAll }) => {
  const handleQuantityChange = (id, action) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: action === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
          }
        : item
    );
    onUpdateCart(updatedItems);
  };

  const handleRemoveItem = (id) => {
    onUpdateCart(cartItems.filter((item) => item.id !== id));
  };

  const handleDeleteSelected = () => {
    onUpdateCart(cartItems.filter(item => !item.selected));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center mb-4 justify-between bg-white">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
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
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
            onSelect={onSelectItem}
          />
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        <button 
          className="bg-white-200 border-2 border-[#55d5d2] text-black px-6 py-2 rounded-2xl"
          onClick={onContinueShopping}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;