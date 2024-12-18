import React from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';
import { formatPrice } from "../../../utils/formatPrice";

const ShoppingCart = ({ onContinueShopping }) => {
  const { items: cartItems, selectAllItems, removeCartItem, selectCartItem, total } = useCart();

  const handleDeleteSelected = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    for (const item of selectedItems) {
      await removeCartItem(item.id);
    }
  };

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
  const selectedItems = cartItems.filter(item => item.selected);

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8">
      <div className="flex items-center mb-2 md:mb-4 justify-between bg-[#eff9f9] p-2 md:p-3 rounded-lg border-2 border-[#55d5d2] w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => selectAllItems(e.target.checked)}
            className="w-4 h-4 mr-2"
          />
          <span>Chọn tất cả</span>
        </div>
        <button 
          onClick={handleDeleteSelected} 
          className="text-[#55d5d2] hover:text-red-500"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-2 md:space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onSelect={() => selectCartItem(item.id)}
            />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tổng quan đơn hàng</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Số lượng sản phẩm:</span>
                <span>{selectedItems.length} sản phẩm</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tổng tiền hàng:</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Tổng thanh toán:</span>
                  <span className="text-red-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button 
              className="w-full bg-[#55d5d2] text-white px-4 py-2 rounded-2xl"
              onClick={onContinueShopping}
            >
              Tiếp tục mua sắm
            </button>
            
            {selectedItems.length > 0 && (
              <button 
                className="w-full bg-red-500 text-white px-4 py-2 rounded-2xl"
                onClick={() => {/* handle checkout */}}
              >
                Tiến hành thanh toán
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;