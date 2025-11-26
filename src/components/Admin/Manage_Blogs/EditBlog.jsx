import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import MDEditor from '@uiw/react-md-editor';

const EditBlog = ({ blog, onClose, onEditSuccess }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [content, setContent] = useState(blog?.content || "");
  const [status, setStatus] = useState(blog?.status || "inactive");
  const [imagePreview, setImagePreview] = useState(blog?.image_url || "");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setContent(blog.content || "");
      setStatus(blog.status);
      setImagePreview(blog.image_url);
    }
  }, [blog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setError("Image must be jpeg, png, jpg, or gif format");
        return;
      }

      if (file.size > maxSize) {
        setError("Image size must be less than 2MB");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('content', content);
      formData.append('status', status);
      
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imagePreview) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append('image', blob, 'existing-image.jpg');
      }

      const response = await axios.post(
        `http://localhost:8000/api/blogs/update/${blog.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        await onEditSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#55D5D2] to-[#3fb8b5]">
        <h1 className="text-2xl font-bold text-white">Edit Blog</h1>
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
            {/* Blog ID */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Blog ID</label>
              <input
                type="text"
                value={blog.id}
                disabled
                className="w-1/4 px-4 py-3 border-2 rounded-lg bg-gray-100 border-gray-300 cursor-not-allowed font-mono"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Featured Image</label>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={imagePreview} 
                    alt="Blog preview" 
                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#55D5D2] transition-colors">
                    <input
                      type="file"
                      id="image-edit"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image-edit" className="cursor-pointer block text-center">
                      <p className="text-gray-600 font-medium mb-1">Click to change image</p>
                      <p className="text-sm text-gray-400">JPEG, PNG, JPG, GIF (max 2MB)</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:border-transparent transition-all"
                maxLength={100}
              />
              <p className="text-sm text-gray-400 mt-1">{title.length}/100 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Short Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:border-transparent transition-all min-h-[120px]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Publication Status</label>
              <div className="relative w-1/3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:border-transparent appearance-none transition-all cursor-pointer"
                >
                  <option value="active">Active (Published)</option>
                  <option value="inactive">Inactive (Draft)</option>
                </select>
                <FaAngleDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
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
                Edit your blog content using Markdown. You can use headings, lists, code blocks, images, and more!
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
            onClick={handleSave}
            disabled={!title.trim() || !description.trim() || loading}
            className={`flex-1 py-3 px-6 rounded-lg shadow-md font-semibold transition-all transform hover:scale-105 ${
              title.trim() && description.trim() && !loading
                ? "bg-gradient-to-r from-[#55D5D2] to-[#3fb8b5] text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
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

EditBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default EditBlog;
