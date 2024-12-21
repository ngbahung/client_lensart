import React, { useMemo } from "react";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from '../../../contexts/CartContext';
import Swal from 'sweetalert2';

const ShoppingCart = ({ onContinueShopping }) => {
  const { items: cartItems, selectCartItem } = useCart();

  // Get the selected branch ID
  const selectedBranchId = useMemo(() => {
    const selectedItem = cartItems.find(item => item.selected);
    return selectedItem?.branch_id;
  }, [cartItems]);

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

  const handleItemSelect = (branchId, itemId) => {
    if (selectedBranchId && selectedBranchId !== branchId) {
      // If selecting an item from a different branch, deselect all items first
      cartItems.forEach(item => {
        if (item.selected) {
          selectCartItem(item.id, false);
        }
      });
    }
    selectCartItem(itemId);
  };

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8">
      {Object.entries(groupedItems).map(([branchId, branch]) => (
        <div key={branchId} className="border-2 border-[#55d5d2] rounded-lg overflow-hidden">
          <div className="flex items-center mb-2 md:mb-4 justify-between bg-[#eff9f9] p-2 md:p-3">
            <div className="flex items-center">
              <span className="font-medium">{branch.branch_name}</span>
            </div>
          </div>
          
          <div className="space-y-2 md:space-y-4 p-4">
            {branch.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isDisabled={selectedBranchId && selectedBranchId !== branchId}
                onSelect={() => handleItemSelect(branchId, item.id)}
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
      </div>
    </div>
  );
};

export default ShoppingCart;