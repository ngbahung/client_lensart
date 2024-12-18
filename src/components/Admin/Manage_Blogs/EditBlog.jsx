import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditBlog = ({ blog, onClose, onEditSuccess }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [status, setStatus] = useState(blog?.status || "inactive");
  const [imagePreview, setImagePreview] = useState(blog?.image_url || "");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
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
      formData.append('status', status);
      
      // Luôn sử dụng tên thẻ 'image' cho cả file mới và url cũ
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imagePreview) {
        // Tạo Blob từ URL ảnh cũ nếu không có file mới
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append('image', blob, 'existing-image.jpg');
      }

      // Debug log
      console.log('Sending data:', {
        title: title.trim(),
        description: description.trim(),
        status: status,
        hasImage: !!imageFile || !!imagePreview
      });

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
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Edit Blog</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-[#55D5D2]">
          Back to List
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">ID</label>
        <input
          type="text"
          value={blog.id}
          disabled
          className="w-1/4 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <div className="flex items-center gap-4">
          <img 
            src={imagePreview} 
            alt="Blog preview" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] min-h-[150px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Status</label>
        <div className="relative w-1/4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <FaAngleDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleSave}
        disabled={!title.trim() || !description.trim() || loading}
        className={`py-2 px-4 rounded-[10px] shadow-md font-semibold ${
          title.trim() && description.trim() && !loading
            ? "bg-teal-400 text-white hover:bg-teal-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

EditBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default EditBlog;
