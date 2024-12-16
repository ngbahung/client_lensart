import React, { useState, useEffect, useRef } from "react"; // Add useRef
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditBlog = ({ blog, onClose, refreshBlogs }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.description || "");
  const [status, setStatus] = useState(blog?.status === "active" ? "active" : "inactive");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(blog?.image_url || "");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.description);
      setStatus(blog.status ? "active" : "inactive");
    }
  }, [blog]);

  const validateForm = () => {
    const errors = [];
    
    if (!title.trim() || title.length < 2 || title.length > 100) {
      errors.push("Title must be between 2 and 100 characters");
    }

    if (!content.trim() || content.length < 2) {
      errors.push("Description must be at least 2 characters long");
    }

    if (!['active', 'inactive'].includes(status)) {
      errors.push("Status must be either active or inactive");
    }

    if (imageFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      const maxSize = 2048 * 1024; // 2048KB = 2MB

      if (!validTypes.includes(imageFile.type)) {
        errors.push("Image must be jpeg, png, jpg, or gif");
      }

      if (imageFile.size > maxSize) {
        errors.push("Image size must not exceed 2MB");
      }
    }

    return errors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image before setting
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      const maxSize = 2048 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setError("Image must be jpeg, png, jpg, or gif");
        return;
      }

      if (file.size > maxSize) {
        setError("Image size must not exceed 2MB");
        return;
      }

      setError(""); // Clear any existing errors
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', content.trim()); // Changed from 'content' to 'description'
      formData.append('status', status);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post(
        `http://localhost:8000/api/blogs/update/${blog.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        await refreshBlogs();
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || "Failed to update blog";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Edit Blog</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      {/* Add divider line */}
      <div className="border-b border-gray-200 mb-6"></div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className="w-1/2 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
          value={blog.id}
          disabled
          readOnly
        />
      </div>

      {/* Move image section here */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Image
        </label>
        <div 
          className="w-48 h-48 border-2 border-dashed border-[#55D5D2] rounded-lg overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Blog preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Click to upload image
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
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
        <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
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
            title.trim() && content.trim() && status && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!title.trim() || !content.trim() || !status || loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

EditBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(["active", "inactive"]).isRequired,
    image_url: PropTypes.string, // Add this
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  refreshBlogs: PropTypes.func.isRequired,
};

export default EditBlog;
