import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
  // Chuyển đổi status thành boolean để dễ xử lý
  const isActive = status === 'active';
  
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={`toggle-${id}`}
        checked={isActive}
        onChange={() => onToggle(id)}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={`toggle-${id}`}
        className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors ${
          isActive ? "bg-[#55d5d2]" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isActive ? "translate-x-9" : "translate-x-1"
          }`}
        ></span>
      </label>
    </div>
  );
};

const Row = ({ variant, onStatusChange, onEdit }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(variant.id, !variant.status);
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
    onEdit(variant);
  };

  // Log để debug
  console.log("Variant data:", variant);
  console.log("Variant status:", variant?.status);

  // Safe check for undefined variant
  if (!variant) {
    return null;
  }

  return (
    <>
      <tr className="hover:bg-gray-100 h-[48px]">
        <td className="py-2 px-4">{variant?.id || 'N/A'}</td>
        <td className="py-2 px-4">{variant?.branch_id || 'N/A'}</td>
        <td className="py-2 px-4">{variant?.color || 'N/A'}</td>
        <td className="py-2 px-4">{variant?.quantity ?? '0'}</td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={variant?.id}
            status={variant?.status || 'inactive'}
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="py-2 px-4 grid place-items-center">
          <button
            className="p-1.5 rounded-md bg-[rgba(123,212,111,1)] hover:opacity-80"
            onClick={handleEdit}
          >
            <BiEdit size={20} className="text-white" />
          </button>
        </td>
      </tr>

      {showStatusModal && (
        <ConfirmChangeStatusModal
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
          isLoading={isUpdating}
        />
      )}
    </>
  );
};

// Cập nhật PropTypes để phù hợp với dữ liệu API
Row.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    product_id: PropTypes.number,
    branch_id: PropTypes.number,
    color: PropTypes.string,
    quantity: PropTypes.number,
    status: PropTypes.string, // Có thể là undefined
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
