import React, { useState } from "react";

const CheckoutSummary = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "GK. GỌNG VIỀN NHỰA TITAN CAO CẤP NA240212",
      variant: "Màu sắc: Đen ghi",
      quantity: 1,
      price: 400000,
    },
    {
      id: 2,
      name: "GK. GỌNG VIỀN NHỰA TITAN CAO CẤP NA240212",
      variant: "Màu sắc: Đen ghi",
      quantity: 1,
      price: 400000,
    },
    {
      id: 3,
      name: "GK. GỌNG VIỀN NHỰA TITAN CAO CẤP NA240212",
      variant: "Màu sắc: Đen ghi",
      quantity: 1,
      price: 400000,
    },
  ]);

  const [discount, setDiscount] = useState(40000);
  const [shippingFee, setShippingFee] = useState(0);

  const handlePlaceOrder = () => {
    console.log("Order placed successfully!");
    console.log({
      products,
      total: calculateTotal(),
      discount,
      shippingFee,
    });
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const calculateFinalAmount = () => {
    return calculateTotal() - discount + shippingFee;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Sản phẩm</h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/60"
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-bold text-gray-700">{product.name}</p>
                <p className="text-gray-500">{product.variant}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-700">x{product.quantity}</p>
              <p className="text-orange-500 font-bold">
                {product.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        ))}

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
    </div>
  );
};

export default CheckoutSummary;
