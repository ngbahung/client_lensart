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
        
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Số lượng sản phẩm:</span>
          <span className="text-lg">{cartItems.length}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Tạm tính:</span>
          <span className="text-lg">{subtotal.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Vận chuyển:</span>
          <span className="text-lg">{shipping.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-lg font-semibold">Thuế (10%):</span>
          <span className="text-lg">{tax.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-300 mt-4">
          <span className="text-xl font-bold">Tổng cộng:</span>
          <span className="text-xl font-bold text-orange-500">{total.toLocaleString()} đ</span>
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
