import React from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';
import Swal from 'sweetalert2';

const ShoppingCart = ({ onContinueShopping }) => {
  const { items: cartItems, selectAllItems, removeCartItem, selectCartItem, total } = useCart();

  const handleDeleteSelected = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast.info('Vui lòng chọn sản phẩm cần xóa');
      return;
    }

    const result = await Swal.fire({
      title: 'Xác nhận xóa',
      text: `Bạn có chắc chắn muốn xóa ${selectedItems.length} sản phẩm đã chọn?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#55d5d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      background: '#fff',
      customClass: {
        confirmButton: 'rounded-lg px-4 py-2',
        cancelButton: 'rounded-lg px-4 py-2'
      }
    });

    if (result.isConfirmed) {
      let successCount = 0;
      for (const item of selectedItems) {
        const success = await removeCartItem(item.id);
        if (success) successCount++;
      }

      if (successCount > 0) {
        Swal.fire({
          title: 'Đã xóa!',
          text: `Đã xóa ${successCount} sản phẩm khỏi giỏ hàng`,
          icon: 'success',
          confirmButtonColor: '#55d5d2',
          timer: 1500
        });
      }
    }
  };

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

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
      
      <div className="space-y-2 md:space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onSelect={() => selectCartItem(item.id)}
          />
        ))}
      </div>
      
      <div className="mt-4 space-y-2 flex gap-2">
        <button 
          className="flex-1 bg-[#55d5d2] text-white px-4 py-2 rounded-2xl"
          onClick={onContinueShopping}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;