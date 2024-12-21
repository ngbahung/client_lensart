import React, { useState } from "react";
import { FaTrashAlt, FaTicketAlt } from "react-icons/fa";

// CheckoutReview Component
const CheckoutReview = ({ cartItems, onUpdateCart, onBackToCart }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const handleRemoveItem = (id) => {
    onUpdateCart(cartItems.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = () => {
    // This is a simple example - you would typically validate with backend
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("Mã giảm giá không hợp lệ");
    }
  };

  // Calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50000; // Fixed shipping cost
  const total = subtotal + shipping - discount;

  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg">
      {/* Coupon Field */}
      <div className="flex space-x-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-[#ec905c] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaTicketAlt />
          Áp dụng
        </button>
      </div>
      {couponError && <p className="text-red-500 text-sm">{couponError}</p>}

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
          <span className="text-lg font-semibold">Giảm giá:</span>
          <span className="text-lg text-green-600">-{discount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-300 mt-4">
          <span className="text-xl font-bold">Tổng cộng:</span>
          <span className="text-xl font-bold text-orange-500">{total.toLocaleString()} đ</span>
        </div>
      </div>

      {/* Checkout Actions */}
      <div className="flex justify-end space-x-4 py-4">
        <button 
          className="bg-[#ec905c] text-white px-6 py-2 rounded-lg"
          onClick={() => {/* Handle order submission */}}
        >
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;
