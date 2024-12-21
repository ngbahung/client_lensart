import React from "react";
import { useCart } from '../../../contexts/CartContext';
import { formatPrice } from '../../../utils/formatPrice';

const CheckoutSummary = () => {
  const { items, discount, coupon } = useCart();
  
  // Only get selected items
  const selectedItems = items.filter(item => item.selected);

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000000 ? 0 : 50000;
  const finalAmount = subtotal - (discount || 0) + shippingFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sticky top-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Chi tiết đơn hàng</h2>

      <div className="max-h-[400px] overflow-y-auto mb-6 pr-2">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 py-4 border-b">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              {item.color && (
                <p className="text-sm text-gray-500">Màu: {item.color}</p>
              )}
              <p className="text-orange-500 font-medium mt-1">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 space-y-4">
        <div className="flex justify-between text-gray-700">
          <span>Tổng tiền</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
        
        {coupon && (
          <div className="flex justify-between text-gray-700">
            <div className="flex flex-col">
              <span className="font-medium">{coupon.name}</span>
              <span className="text-sm text-green-600">Mã: {coupon.code}</span>
            </div>
            <span className="text-green-500 font-bold">
              -{formatPrice(coupon.discount_price)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-700">
          <span>Phí vận chuyển</span>
          <span className="font-bold">
            {shippingFee > 0 ? formatPrice(shippingFee) : "Miễn phí"}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-900 font-bold border-t pt-4">
          <span>Cần thanh toán</span>
          <span className="text-orange-500">{formatPrice(finalAmount)}</span>
        </div>
      </div>

      <button
        type="submit"
        form="checkout-form"
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-medium transition-all text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Đặt hàng ngay
      </button>
    </div>
  );
};

export default CheckoutSummary;
