import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CreateProductVariants = ({ onClose, onUpdate, productId }) => {
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!color.trim()) {
      setError("Please enter a color");
      return;
    }
    
    setError("");
    setLoading(true);

    const data = {
      product_id: productId,
      color: color.trim(),
      quantity: quantity,
      status: 'active' // Mặc định là active khi tạo mới
    }
    
    try {
      const response = await axios.post('http://localhost:8000/api/product-details/createForAllBranch',data);
      
      await onUpdate();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Create New Variant</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      {/* Read-only Product ID field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Product ID
        </label>
        <div className="w-1/2 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300">
          {productId || 'N/A'}
        </div>
      </div>

      {/* Input fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="color">
          Color
        </label>
        <input
          type="text"
          id="color"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter color name"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          min="0"
          placeholder="Enter quantity"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-start">
        <button
          className={`py-2 px-6 rounded-[10px] shadow-md font-semibold ${
            color.trim() && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!color.trim() || loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

CreateProductVariants.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
};

export default CreateProductVariants;
