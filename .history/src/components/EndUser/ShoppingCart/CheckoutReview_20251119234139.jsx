import React, { useState } from "react";
import { FaTrashAlt, FaTicketAlt, FaTimes } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const CheckoutReview = () => {
  const { items: cartItems, total, discount, coupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.selected ? item.price * item.quantity : 0), 0
  );
  
  const hasSelectedItems = cartItems.some(item => item.selected);
  const shipping = hasSelectedItems ? (subtotal >= 1000000 ? 0 : 20000) : 0;
  const finalTotal = subtotal + shipping - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplying(true);
    try {
      await applyCoupon(couponCode);
      setCouponCode("");
    } finally {
      setIsApplying(false);
    }
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast.warning('Vui lòng chọn sản phẩm để thanh toán');
      return;
    }

    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thanh toán');
      navigate('/login', { state: { from: '/gio-hang' } });
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="w-full lg:max-w-md mx-auto p-4 md:p-6 space-y-3 md:space-y-5 bg-[#eff9f9] border-2 border-[#55d5d2] rounded-lg">
      {/* Coupon Section */}
      {!coupon ? (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Nhập mã giảm giá"
            className="w-full sm:flex-1 p-2 md:p-3 border rounded-lg text-sm"
            disabled={isApplying}
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplying || !couponCode.trim()}
            className="w-full sm:w-auto bg-[#ec905c] text-white px-3 md:px-4 py-2 md:py-3 rounded-lg flex items-center justify-center gap-1 text-base disabled:opacity-50"
          >
            <FaTicketAlt size={14} />
            {isApplying ? 'Đang áp dụng...' : 'Áp dụng'}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <FaTicketAlt className="text-green-500" />
            <div className="flex flex-col">
              <span className="text-green-700 font-medium">{coupon.name}</span>
              <span className="text-sm text-green-600">Giảm {formatPrice(coupon.discount_price)}</span>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="text-red-500 hover:text-red-700"
            title="Xóa mã giảm giá"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Order Summary */}
      <div className="space-y-3">
        <div className="flex justify-between py-1">
          <span>Tạm tính:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between py-1 text-green-600">
            <span>{coupon.name}</span>
            <span>-{formatPrice(coupon.discount_price)}</span>
          </div>
        )}
        <div className="flex justify-between py-1">
          <span>Phí vận chuyển:</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-300 mt-3">
          <span className="text-lg font-bold">Tổng thanh toán:</span>
          <span className="text-lg font-bold text-orange-500">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={handleCheckout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 mt-4"
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
};

export default CheckoutReview;
