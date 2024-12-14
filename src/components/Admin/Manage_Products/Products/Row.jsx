import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaCog } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={`toggle-${id}`}
        checked={status}
        onChange={() => onToggle(id)}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={`toggle-${id}`}
        className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors ${
          status ? "bg-[#55d5d2]" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            status ? "translate-x-9" : "translate-x-1"
          }`}
        ></span>
      </label>
    </div>
  );
};

const Row = ({ product, onStatusChange, onEdit }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(product.id, !product.status);
      setShowStatusModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelStatusChange = () => {
    setShowStatusModal(false);
  };

  const handleEdit = () => {
    onEdit(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 h-[48px]">
        <td className="py-2 px-4">{product.id}</td>
        <td className="py-2 px-4">{product.name}</td>
        <td className="py-2 px-4">
          <div 
            title={product.description}
            className="line-clamp-2 max-h-[3em] overflow-hidden"
          >
            {product.description || 'N/A'}
          </div>
        </td>
        <td className="py-2 px-4">{product.price ? `${formatPrice(product.price)}` : 'N/A'}</td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={product.id}
            status={product.status}
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="py-2 px-4">
          <div className="flex items-center justify-center gap-2">
            <button
              className="p-2 rounded-md bg-[rgba(123,212,111,1)] hover:opacity-80"
              onClick={handleEdit}
            >
              <BiEdit size={18} className="text-white" />
            </button>
            <button
              className="p-2 rounded-md bg-[rgba(236,144,92,1)] hover:opacity-80 flex items-center gap-1"
            >
              <FaCog size={16} className="text-white" />
              <FaAngleDown size={8} className="text-white" />
            </button>
          </div>
        </td>
      </tr>

      {showStatusModal && (
        <tr>
          <td colSpan="6">
            <ConfirmChangeStatusModal
              onConfirm={handleConfirmStatusChange}
              onCancel={handleCancelStatusChange}
              isLoading={isUpdating}
            />
          </td>
        </tr>
      )}
    </>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Row.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.bool.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
