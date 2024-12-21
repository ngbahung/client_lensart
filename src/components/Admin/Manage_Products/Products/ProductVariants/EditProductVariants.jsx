import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditProductVariants = ({ variant, onClose, onUpdate }) => {
  const [quantity, setQuantity] = useState(variant?.quantity || 0);
  const [status, setStatus] = useState(variant?.status || "active");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variant) {
      setQuantity(variant.quantity || 0);
      setStatus(variant.status || "active");
    }
  }, [variant]);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      // Construct URL with all required parameters
      const updateUrl = `http://localhost:8000/api/product-details/update/${variant.product_id}/${variant.branch_id}/${variant.color}`;
      
      console.log("Update URL:", updateUrl); // Debug log
      console.log("Update data:", { quantity, status }); // Debug log

      const response = await axios.post(updateUrl, {
        quantity: quantity,
        status: status
      });

      if (response.status === 200) {
        await onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Edit Variant</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      {/* Read-only fields */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            value={variant?.id || ''}
            disabled
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">Branch</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            value={`${variant?.branch_id || 'N/A'}`}
            disabled
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2">Color</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
            value={variant?.color || ''}
            disabled
            readOnly
          />
        </div>
      </div>

      {/* Editable fields */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-start">
        <button
          className={`py-2 px-6 rounded-[10px] shadow-md font-semibold ${
            !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

EditProductVariants.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired, // Thêm product_id
    branch_id: PropTypes.number.isRequired, // Thêm branch_id
    color: PropTypes.string.isRequired,     // Thêm color
    quantity: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProductVariants;
