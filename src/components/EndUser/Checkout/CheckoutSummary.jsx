import React, { useState } from "react";

const CheckoutSummary = ({ cartItems = [] }) => {
  const [discount] = useState(40000);
  const [shippingFee] = useState(0);

  const calculateTotal = () => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateFinalAmount = () => {
    return calculateTotal() - discount + shippingFee;
  };

  const handlePlaceOrder = () => {
    console.log("Order placed successfully!");
    console.log({
      cartItems,
      total: calculateTotal(),
      discount,
      shippingFee,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">Sản phẩm</h2>

      {!cartItems || cartItems.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào trong giỏ hàng</p>
      ) : (
        cartItems.filter(item => item.selected).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-bold text-gray-700">{item.name}</p>
                {item.variant && <p className="text-gray-500">{item.variant}</p>}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-700">x{item.quantity}</p>
              <p className="text-orange-500 font-bold">
                {item.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        ))
      )}

      <div className="mt-6 border-t pt-4 space-y-4">
        <div className="flex justify-between text-gray-700">
          <span>Tổng tiền</span>
          <span className="font-bold">
            {calculateTotal().toLocaleString("vi-VN")}đ
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tổng khuyến mãi</span>
          <span className="text-green-500 font-bold">
            {discount.toLocaleString("vi-VN")}đ
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Phí vận chuyển</span>
          <span className="font-bold">
            {shippingFee > 0 ? shippingFee.toLocaleString("vi-VN") + "đ" : "Miễn phí"}
          </span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold border-t pt-4">
          <span>Cần thanh toán</span>
          <span className="text-orange-500">
            {calculateFinalAmount().toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all"
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default CheckoutSummary;
