import React, { useState } from "react";
import CartItem from "./CartItem";


const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: "GK.M GỌNG NHỰA AN221393",
        color: "Nâu",
        quantity: 2,
        price: 350000,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "GK.M GỌNG NHỰA AN221394",
        color: "Đen",
        quantity: 1,
        price: 450000,
        image: "https://via.placeholder.com/150",
      },
    ]);
  
    // Handle quantity change
    const handleQuantityChange = (id, action) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: action === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
              }
            : item
        )
      );
    };
  
    // Handle remove item
    const handleRemoveItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
  
    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="flex justify-between items-center py-4 border-t font-semibold">
          <span className="text-xl">Tổng cộng:</span>
          <span className="text-xl">{totalPrice} đ</span>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-200 text-black px-6 py-2 rounded-lg">Tiếp tục mua sắm</button>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">Thanh toán</button>
        </div>
      </div>
    );
  };
  
  export default ShoppingCart;