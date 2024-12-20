import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";

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

const Row = ({ image, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(image.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="hover:bg-gray-100 h-[48px]">
      <td className="py-2 px-4">{image.id}</td>
      <td className="py-2 px-4">
        {image.image_url ? (
          <img 
            src={image.image_url} 
            alt={`Product Image ${image.id}`} 
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
            No image
          </div>
        )}
      </td>
      <td className="h-full">
        <div className="flex items-center justify-center h-full min-h-[64px]">
          <button
            className={`p-1.5 rounded-md ${
              isDeleting ? 'bg-gray-400' : 'bg-[rgba(255,0,5,1)]'
            } hover:opacity-80`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="w-5 h-5 block border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FiTrash2 size={20} className="text-white" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['active', 'inactive']).isRequired, // Update PropTypes to use string
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Row.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    image_public_id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Row;
