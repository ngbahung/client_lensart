import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MDEditor from '@uiw/react-md-editor';

const CreateBlog = ({ onClose, onCreateSuccess }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' or 'content'

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

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(imageFile.type)) {
      setError("Image must be in jpeg, png, jpg, or gif format");
      return false;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (imageFile.size > maxSize) {
      setError("Image size must be less than 2MB");
      return false;
    }

    if (!title.trim() || title.length < 2 || title.length > 100) {
      setError("Title must be between 2 and 100 characters");
      return false;
    }

    if (!description.trim() || description.length < 2) {
      setError("Description must be at least 2 characters long");
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
      formData.append('image', imageFile);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('content', content);

      const response = await axios.post('http://localhost:8000/api/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        onCreateSuccess();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#55D5D2] to-[#3fb8b5]">
        <h1 className="text-2xl font-bold text-white">Create New Blog</h1>
        <button 
          onClick={onClose}
          className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
        >
          Back to List
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "basic"
              ? "text-[#55D5D2] border-b-2 border-[#55D5D2] bg-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "content"
              ? "text-[#55D5D2] border-b-2 border-[#55D5D2] bg-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Content (Markdown)
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {activeTab === "basic" && (
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3" htmlFor="image">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#55D5D2] transition-colors">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer block text-center">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                      <p className="text-sm text-gray-400">JPEG, PNG, JPG, GIF (max 2MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3" htmlFor="title">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:border-transparent transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging blog title..."
                maxLength={100}
              />
              <p className="text-sm text-gray-400 mt-1">{title.length}/100 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3" htmlFor="description">
                Short Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:border-transparent transition-all min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a brief description that will appear on the blog listing page..."
              />
              <p className="text-sm text-gray-400 mt-1">This will be shown as a preview</p>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Blog Content (Markdown)
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Write your blog content using Markdown. You can use headings, lists, code blocks, images, and more!
              </p>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  height={500}
                  preview="live"
                  hideToolbar={false}
                  enableScroll={true}
                  visibleDragbar={true}
                />
              </div>
              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Markdown Tips:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Use # for headings (# H1, ## H2, ### H3)</li>
                  <li>• Use **bold** for bold text and *italic* for italic</li>
                  <li>• Use [link text](url) for links</li>
                  <li>• Use ![alt text](image-url) for images</li>
                  <li>• Use ``` for code blocks</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            className={`flex-1 py-3 px-6 rounded-lg shadow-md font-semibold transition-all transform hover:scale-105 ${
              imageFile && title.trim() && description.trim() && !loading
                ? "bg-gradient-to-r from-[#55D5D2] to-[#3fb8b5] text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={!imageFile || !title.trim() || !description.trim() || loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Blog"
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CreateBlog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateSuccess: PropTypes.func.isRequired,
};

export default CreateBlog;
