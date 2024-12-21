import React from "react";
import { FaTrashAlt } from "react-icons/fa";

// CheckoutReview Component
const CheckoutReview = ({ cartItems, onUpdateCart, onBackToCart }) => {
  const handleRemoveItem = (id) => {
    onUpdateCart(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal, shipping, taxes, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50000; // Fixed shipping cost
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold">Kiểm tra thông tin đơn hàng</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Màu sắc: {item.color}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold">{item.price * item.quantity} đ</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Số lượng sản phẩm:</span>
          <span className="text-lg">{cartItems.length}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Tạm tính:</span>
          <span className="text-lg">{shipping} đ</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Thuế (10%):</span>
          <span className="text-lg">{tax} đ</span>
        </div>
        <div className="flex justify-between py-2 font-semibold">
          <span className="text-lg">Tổng cộng:</span>
          <span className="text-xl text-orange-500">{total} đ</span>
        </div>
      </div>

      {/* Checkout Actions */}
      <div className="flex justify-end space-x-4 py-4">
        <button 
          className="bg-gray-200 text-black px-6 py-2 rounded-lg"
          onClick={onBackToCart}
        >
          Quay lại giỏ hàng
        </button>
        <button 
          className="bg-orange-500 text-white px-6 py-2 rounded-lg"
          onClick={() => {/* Handle order submission */}}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;
