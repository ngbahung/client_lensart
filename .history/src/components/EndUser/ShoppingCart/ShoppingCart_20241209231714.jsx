import React from "react";
import CartItem from "./CartItem";

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

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="w-4 h-4 mr-2"
        />
        <span>Chọn tất cả</span>
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
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
          onClick={onContinueShopping}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;