import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { useCart } from '../../../contexts/CartContext';

const CartItem = ({ item, onSelect }) => {
  const { updateCartItem, removeCartItem, updatingItems } = useCart();
  const isUpdating = updatingItems[item.id];

  const handleQuantityChange = async (action) => {
    if (isUpdating) return; // Prevent updates while loading

    const newQuantity = action === "increment" ? 
      item.quantity + 1 : 
      Math.max(item.quantity - 1, 1);

    if (newQuantity !== item.quantity) {
      await updateCartItem(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 md:py-4 px-3 md:px-4 border-2 border-[#55d5d2] bg-[#eff9f9] rounded-lg mb-2">
      <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => onSelect(item.id)}
          className="w-4 h-4"
        />
        <img src={item.image || '/placeholder-image.jpg'} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover" />
        <div className="flex flex-col">
          <h3 className="text-base md:text-lg font-semibold">{item.name}</h3>
          <p className="text-xs md:text-sm text-gray-500">Thương hiệu: {item.brand}</p>
          <p className="text-xs md:text-sm text-gray-500">Màu sắc: {item.color}</p>
          <p className="text-xs md:text-sm text-gray-500">Chi nhánh: {item.branch_name}</p>
          <p className="text-sm md:text-md font-medium text-[#55d5d2]">{formatPrice(item.price)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto mt-2 sm:mt-0">
        <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange("decrement")}
          disabled={item.quantity <= 1 || isUpdating}
          className={`bg-gray-200 p-1 rounded-full ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaMinus size={12} className={isUpdating ? 'animate-pulse' : ''} />
        </button>
        <span className={`w-8 text-center ${isUpdating ? 'animate-pulse' : ''}`}>
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange("increment")}
          disabled={isUpdating}
          className={`bg-gray-200 p-1 rounded-full ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaPlus size={12} className={isUpdating ? 'animate-pulse' : ''} />
        </button>
        </div>
        <span className="text-lg md:text-xl font-semibold">
          {formatPrice(item.price * item.quantity)}
        </span>
        <button 
          onClick={() => removeCartItem(item.id)} 
          disabled={isUpdating}
          className={`text-[#55d5d2] hover:text-red-500 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;