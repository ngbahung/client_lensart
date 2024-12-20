import React, { useMemo } from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';
import Swal from 'sweetalert2';

const ShoppingCart = ({ onContinueShopping, onCheckout }) => {
  const { items: cartItems, selectAllItems, removeCartItem, selectCartItem, total } = useCart();

  // Group items by branch
  const groupedItems = useMemo(() => {
    const groups = {};
    cartItems.forEach(item => {
      if (!groups[item.branch_id]) {
        groups[item.branch_id] = {
          branch_name: item.branch_name,
          items: []
        };
      }
      groups[item.branch_id].items.push(item);
    });
    return groups;
  }, [cartItems]);

  // Check if all items in a branch are selected
  const isBranchSelected = (branchItems) => {
    return branchItems.every(item => item.selected);
  };

  // Handle branch selection
  const handleBranchSelection = (branchId, isSelected) => {
    const branchItems = groupedItems[branchId].items;
    if (isSelected) {
      // Deselect all other branches first
      cartItems.forEach(item => {
        if (item.branch_id !== branchId) {
          selectCartItem(item.id, false);
        }
      });
      // Select all items in this branch
      branchItems.forEach(item => {
        selectCartItem(item.id, true);
      });
    } else {
      // Deselect all items in this branch
      branchItems.forEach(item => {
        selectCartItem(item.id, false);
      });
    }
  };

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

  // Update the onSelect handler in CartItem to deselect items from other branches
  const handleItemSelect = (item) => {
    if (!item.selected) {
      // If selecting an item, deselect all items from other branches first
      cartItems.forEach(cartItem => {
        if (cartItem.branch_id !== item.branch_id) {
          selectCartItem(cartItem.id, false);
        }
      });
    }
    selectCartItem(item.id);
  };

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8">
      {Object.entries(groupedItems).map(([branchId, branch]) => (
        <div key={branchId} className="border-2 border-[#55d5d2] rounded-lg overflow-hidden">
          <div className="flex items-center mb-2 md:mb-4 justify-between bg-[#eff9f9] p-2 md:p-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isBranchSelected(branch.items)}
                onChange={(e) => handleBranchSelection(branchId, e.target.checked)}
                className="w-4 h-4 mr-2"
              />
              <span className="font-medium">{branch.branch_name}</span>
            </div>
          </div>
          
          <div className="space-y-2 md:space-y-4 p-4">
            {branch.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onSelect={() => handleItemSelect(item)}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-4 space-y-2 flex gap-2">
        <button 
          className="flex-1 bg-[#55d5d2] text-white px-4 py-2 rounded-2xl"
          onClick={onContinueShopping}
        >
          Tiếp tục mua sắm
        </button>
        <button 
          className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-2xl"
          onClick={onCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;