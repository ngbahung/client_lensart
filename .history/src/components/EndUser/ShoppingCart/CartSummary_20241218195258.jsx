import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import { formatPrice } from '../../../utils/formatPrice';

const CartSummary = () => {
  const { items, total } = useCart();
  const selectedItems = items.filter(item => item.selected);
  
  return (
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
  );
};

export default CartSummary;
