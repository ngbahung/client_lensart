import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";

// CheckoutReview Component
const CheckoutReview = ({ cartItems, onUpdateCart }) => {
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
    <div className="p-4 space-y-4 bg-[#eff9f9] rounded-lg">
      {/* Coupon Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="flex-1 p-2 text-sm border rounded-lg"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-[#ec905c] text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
        >
          <FaTicketAlt size={12} />
          Áp dụng
        </button>
      </div>
      {couponError && <p className="text-red-500 text-sm">{couponError}</p>}

      {/* Order Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Số lượng sản phẩm:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính:</span>
          <span>{subtotal.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Vận chuyển:</span>
          <span>{shipping.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Giảm giá:</span>
          <span className="text-green-600">-{discount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-300">
          <span className="font-bold">Tổng cộng:</span>
          <span className="font-bold text-orange-500">{total.toLocaleString()} đ</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#ec905c] text-white px-4 py-1.5 rounded-lg text-sm">
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutReview;
