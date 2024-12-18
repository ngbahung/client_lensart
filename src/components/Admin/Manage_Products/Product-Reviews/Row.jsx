import React, { useState, useEffect } from "react";
import axios from 'axios';
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
  const [userName, setUserName] = useState('Loading...');
  const [productName, setProductName] = useState('Loading...'); // Add this

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getById/${review.user_id}`);
        if (response.data && response.data.data) {
          const user = response.data.data;
          setUserName(`${user.firstName} ${user.lastName}`.trim() || 'Anonymous');
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName('Anonymous');
      }
    };

    const fetchProductName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/getById/${review.product_id}`);
        if (response.data && response.data.data) {
          setProductName(response.data.data.name || 'Unknown Product');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductName('Unknown Product');
      }
    };

    if (review.user_id) {
      fetchUserName();
    } else {
      setUserName('Anonymous');
    }

    if (review.product_id) {
      fetchProductName();
    } else {
      setProductName('Unknown Product');
    }
  }, [review.user_id, review.product_id]);

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
        <td className="py-2 px-4">{productName}</td>
        <td className="py-2 px-4">{userName}</td>
        <td className="py-2 px-4">{review.rating} ★</td>
        <td className="py-2 px-4">{review.review}</td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={review.id}
            status={review.status}
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="py-2 px-4 grid place-items-center">
          <button
            className="p-1.5 rounded-md bg-[rgba(255,0,5,1)] hover:opacity-80"
            onClick={handleDelete}  // Change to handleDelete
          >
            <FaRegTrashAlt size={20} className="text-white" />
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
};

ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['active', 'inactive']).isRequired,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Row.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired, // Changed from productName to product_id
    user_id: PropTypes.number,  // Changed from userId to user_id
    review: PropTypes.string.isRequired, // Changed from comment to review
    rating: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['active', 'inactive']).isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,  // Replace onEdit with onDelete
};

export default Row;
