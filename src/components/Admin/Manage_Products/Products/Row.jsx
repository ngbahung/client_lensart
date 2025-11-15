import React, { useState, useRef, useEffect } from "react";
import { BiEdit, BiFileBlank } from "react-icons/bi";
import { FaCog, FaAngleDown, FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";
import ImageGalleryPage from './ImageGallery/ImageGalleryPage';
import ProductVariantsPage from './ProductVariants/ProductVariantsPage';  // Add this import

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
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

const Row = ({ product, onStatusChange, onEdit }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSettingsClick = () => {
    setShowDropdown(!showDropdown);
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
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 rounded-md bg-[rgba(236,144,92,1)] hover:opacity-80 flex items-center gap-1"
                onClick={handleSettingsClick}
              >
                <FaCog size={16} className="text-white" />
                <FaAngleDown size={8} className="text-white" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[rgba(236,170,131,1)] rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 text-white hover:bg-[rgba(236,144,92,1)] flex items-center gap-2"
                        onClick={() => {
                          setShowImageGallery(true);
                          setShowDropdown(false);
                        }}
                      >
                        <FaRegHeart size={16} />
                        Image Gallery
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 text-white hover:bg-[rgba(236,144,92,1)] flex items-center gap-2"
                        onClick={() => {
                          setShowVariants(true);
                          setShowDropdown(false);
                        }}
                      >
                        <BiFileBlank size={16} />
                        Color Variant
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>

      {/* Update Image Gallery Modal styling */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] w-[90%] h-[90%] overflow-hidden shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[rgba(236, 144, 92, 1)]">{product.name}</h2>
              <button 
                onClick={() => setShowImageGallery(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-medium"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <ImageGalleryPage productId={product.id} /> {/* Đảm bảo truyền product.id vào đây */}
            </div>
          </div>
        </div>
      )}

      {/* Add Product Variants Modal */}
      {showVariants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] w-[90%] h-[90%] overflow-hidden shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[rgba(236, 144, 92, 1)]">
                Color Variants - {product.name}
              </h2>
              <button 
                onClick={() => setShowVariants(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-medium"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto">
              <ProductVariantsPage productId={product.id} />
            </div>
          </div>
        </div>
      )}

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
    status: PropTypes.string.isRequired, // Thay đổi từ bool sang string
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
