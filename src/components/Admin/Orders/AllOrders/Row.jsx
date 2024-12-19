import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={`toggle-${id}`}
        checked={status === 'active'} // Use string comparison
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

const Row = ({ blog, onStatusChange, onEdit }) => { // Remove onDelete from props
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(blog.id, !blog.status);
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
    onEdit(blog);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 h-[48px]">
        <td className="py-2 px-4">{blog.id}</td>
        <td className="py-2 px-4">
          {blog.image_url ? (
            <img 
              src={blog.image_url} 
              alt={blog.title} 
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              No image
            </div>
          )}
        </td>
        <td className="py-2 px-4">{blog.title}</td>
        <td className="py-2 px-4">
          <div className="line-clamp-2 text-sm text-gray-600">
            {blog.description || 'No description'}
          </div>
        </td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={blog.id}
            status={blog.status} // Pass status directly as string
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="h-full">
          <div className="flex items-center justify-center h-full min-h-[64px]">
            <button
              className="p-1.5 rounded-md bg-[rgba(123,212,111,1)] hover:opacity-80"
              onClick={handleEdit}
            >
              <BiEdit size={20} className="text-white" />
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
    </>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['active', 'inactive']).isRequired, // Update PropTypes to use string
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Row.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['active', 'inactive']).isRequired, // Update PropTypes
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
