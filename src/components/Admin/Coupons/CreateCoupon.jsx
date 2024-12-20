import React, { useState } from "react";
import axios from "axios";

const CreateCoupon = ({ onClose, onUpdate }) => {  // Thay refreshCoupons bằng onUpdate
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    quantity: "",
    discount_price: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2 || formData.name.length > 100) {
      errors.push("Name must be between 2 and 100 characters");
    }

    if (!formData.code || formData.code.length < 3 || formData.code.length > 15) {
      errors.push("Code must be between 3 and 15 characters");
    }

    if (!formData.quantity || formData.quantity < 0 || !Number.isInteger(Number(formData.quantity))) {
      errors.push("Quantity must be a positive integer");
    }

    if (!formData.discount_price || formData.discount_price <= 0) {
      errors.push("Discount price must be a positive number");
    }

    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }
    
    setError("");
    setLoading(true);
    
    const postData = {
      name: formData.name.trim(),
      code: formData.code.trim().toUpperCase(),
      quantity: parseInt(formData.quantity),
      discount_price: parseFloat(formData.discount_price),
    };
    
    try {
      const response = await axios.post('http://localhost:8000/api/coupons/create', postData);
      await onUpdate();  // Gọi onUpdate thay vì refreshCoupons
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0] || 
                          "Failed to save coupon";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'code') {
      processedValue = value.toUpperCase();
    }
    if (name === 'quantity') {
      processedValue = value.replace(/\D/g, '');
    }
    if (name === 'discount_price') {
      processedValue = value.replace(/[^\d.]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h1 className="text-xl font-semibold">Create Coupon</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter coupon name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="code">
            Code
          </label>
          <input
            type="text"
            name="code"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter coupon code"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="discount_price">
            Discount Price
          </label>
          <input
            type="number"
            name="discount_price"
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={formData.discount_price}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-start">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            formData.name && formData.code && formData.quantity && formData.discount_price && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!formData.name || !formData.code || !formData.quantity || !formData.discount_price || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreateCoupon;
