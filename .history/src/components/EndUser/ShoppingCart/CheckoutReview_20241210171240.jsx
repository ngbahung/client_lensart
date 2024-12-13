import React, { useState } from "react";
import { FaTrashAlt, FaTicketAlt } from "react-icons/fa";

// CheckoutReview Component
const CheckoutReview = ({ cartItems, onUpdateCart, onBackToCart }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Calculate subtotal first
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Calculate shipping based on subtotal
  const shipping = subtotal >= 1000000 ? 0 : 50000;
  
  // Calculate final total
  const total = subtotal + shipping - discount;

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

  return (
    <div className="w-full lg:max-w-md mx-auto p-4 md:p-6 space-y-3 md:space-y-5 bg-[#eff9f9] border-2 border-[#55d5d2] rounded-lg">
      {/* Coupon Field */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="w-full sm:flex-1 p-2 md:p-3 border rounded-lg text-sm"
        />
        <button
          onClick={handleApplyCoupon}
          className="w-full sm:w-auto bg-[#ec905c] text-white px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-center justify-center gap-1 text-base"
        >
          <FaTicketAlt size={14} />
          Áp dụng
        </button>
      </div>
      {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}

      {/* Order Summary */}
      <div className="space-y-3">
        <div className="flex justify-between py-1">
          <span className="text-base font-semibold">Số lượng sản phẩm:</span>
          <span className="text-base font-semibold">{cartItems.length}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-base font-semibold">Tạm tính:</span>
          <span className="text-base font-semibold">{subtotal.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-base font-semibold">Vận chuyển:</span>
          <span className="text-base font-semibold">{shipping.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-base font-semibold">Giảm giá:</span>
          <span className="text-base font-semibold text-green-600">-{discount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-300 mt-3">
          <span className="text-lg font-bold">Tổng cộng:</span>
          <span className="text-lg font-bold text-orange-500">{total.toLocaleString()} đ</span>
        </div>
      </div>

      {/* Checkout Actions */}
      <div className="flex justify-end mt-3">
        <button 
          className="bg-[#ec905c] text-white w-full px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-base"
          onClick={() => {/* Handle order submission */}}
        >
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;
