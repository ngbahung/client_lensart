import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const CreateBlog = ({ onClose, refreshBlogs }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!imageFile) {
      setError("Image is required");
      return false;
    }

    // Validate image type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(imageFile.type)) {
      setError("Image must be in jpeg, png, jpg, or gif format");
      return false;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (imageFile.size > maxSize) {
      setError("Image size must be less than 2MB");
      return false;
    }

    // Validate title
    if (!title.trim() || title.length < 2 || title.length > 100) {
      setError("Title must be between 2 and 100 characters");
      return false;
    }

    // Validate description
    if (!description.trim() || description.length < 2) {
      setError("Description must be at least 2 characters long");
      return false;
    }

    // Validate status
    if (!['inactive', 'active'].includes(status)) {
      setError("Invalid status selected");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('status', status);

      const response = await axios.post('http://localhost:8000/api/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Create New Blog</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="max-w-[200px] h-auto" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] min-h-[200px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter blog description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
          Status
        </label>
        <div className="relative w-1/4">
          <select
            id="status"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex gap-4">
        <button
          className={`py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            imageFile && title.trim() && description.trim() && status && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!imageFile || !title.trim() || !description.trim() || !status || loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </div>
    </div>
  );
};

CreateBlog.propTypes = {
  onClose: PropTypes.func.isRequired,
  refreshBlogs: PropTypes.func.isRequired,
};

export default CreateBlog;
