import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item, onRemove, onQuantityChange, onSelect }) => {
    return (
      <div className="flex items-center justify-between py-4 px-4 border-b bg-[#eff9f9] rounded-lg mb-2">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4"
          />
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">Màu sắc: {item.color}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onQuantityChange(item.id, "decrement")}
              className="bg-gray-200 p-1 rounded-full"
            >
              <FaMinus />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, "increment")}
              className="bg-gray-200 p-1 rounded-full"
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-xl font-semibold">{item.price * item.quantity} đ</span>
          <button onClick={() => onRemove(item.id)} className="text-red-500">
            <FaTrashAlt size={20} />
          </button>
        </div>
      </div>
    );
}

export default CartItem;