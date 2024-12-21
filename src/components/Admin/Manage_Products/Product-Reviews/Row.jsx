import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa"; // Change import
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={`toggle-${id}`}
        checked={status === 'active'}
        onChange={() => onToggle(id)}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={`toggle-${id}`}
        className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors ${
          status === 'active' ? "bg-[#55d5d2]" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            status === 'active' ? "translate-x-9" : "translate-x-1"
          }`}
        ></span>
      </label>
    </div>
  );
};

const Row = ({ review, onStatusChange, onDelete }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // Add this
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(review.id, !review.status);
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

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(review.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 h-[48px]">
        <td className="py-2 px-4">{review.id}</td>
        <td className="py-2 px-4">{review.product_name}</td>
        <td className="py-2 px-4">{review.user_name}</td>
        <td className="py-2 px-4">
          <div className="flex items-center gap-1">
            <span>{review.rating}</span>
            <FaStar className="text-yellow-500" />
          </div>
        </td>
        <td className="py-2 px-4">
          <div className="line-clamp-2 max-h-[48px] overflow-hidden">
            {review.review}
          </div>
        </td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={review.id}
            status={review.status}
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="align-middle h-full">
          <div className="flex justify-center">
            <button
              className="p-1.5 rounded-md bg-[rgba(255,0,5,1)] hover:opacity-80"
              onClick={handleDelete}
            >
              <FaRegTrashAlt size={20} className="text-white" />
            </button>
          </div>
        </td>
      </tr>

      {showStatusModal && (
        <ConfirmChangeStatusModal
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
          isLoading={isUpdating}
        />
      )}

      {showDeleteModal && (
        <ConfirmChangeStatusModal  // Reuse the same modal component
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={false}
          title="Bạn có chắc chắn muốn xóa review này không?"
          message="Tác vụ này sẽ xóa vĩnh viễn review"
        />
      )}
    </>
  );
}

// Fix the PropTypes definitions
ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['active', 'inactive']).isRequired,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}; // Added missing semicolon

Row.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    user_name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['active', 'inactive']).isRequired
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}; // Added missing semicolon

export default Row;
