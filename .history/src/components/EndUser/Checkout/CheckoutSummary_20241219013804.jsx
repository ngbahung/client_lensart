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
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>

      {selectedItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-bold text-gray-700">{item.name}</p>
              {item.color && (
                <p className="text-gray-500">Màu: {item.color}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-700">x{item.quantity}</p>
            <p className="text-orange-500 font-bold">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>
      ))}

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
        onClick={() => console.log("Order placed successfully!")}
        className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all"
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default CheckoutSummary;
