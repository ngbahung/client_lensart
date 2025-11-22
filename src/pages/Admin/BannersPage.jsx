import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiImage, FiTrash2, FiCheck } from 'react-icons/fi';

const BannersPage = () => {
  const [currentBanner, setCurrentBanner] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const getAuthHeaders = () => {
    const adminToken = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${adminToken}`,
      'Accept': 'application/json',
    };
  };

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/banner', {
        headers: getAuthHeaders()
      });
      if (response.data?.status === 'success' && response.data.data) {
        setCurrentBanner(response.data.data);
        setPreviewUrl(response.data.data.image_url);
      }
    } catch (err) {
      console.error('Error fetching banner:', err);
      toast.error('Failed to load banner');
    } finally {
      setLoading(false);
    }
  };

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('Image size must not exceed 10MB');
      return false;
    }

    return true;
  };

  const handleImageSelect = (file) => {
    if (!validateImage(file)) return;

    setSelectedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageSelect(file);
    } else {
      toast.error('Please drop a valid image file');
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(currentBanner?.image_url || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateBanner = async () => {
    if (!selectedImage) {
      toast.warning('Please select an image to upload');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('status', 'active');

      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.post(
        'http://localhost:8000/api/banner/update',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );

      if (response.data?.status === 'success') {
        toast.success('Banner updated successfully!');
        setCurrentBanner(response.data.data);
        setPreviewUrl(response.data.data.image_url);
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      console.error('Error updating banner:', err);
      toast.error(err.response?.data?.message || 'Failed to update banner');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!currentBanner) {
      toast.warning('No banner to toggle status');
      return;
    }

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:8000/api/banner/switch-status', {}, {
        headers: getAuthHeaders()
      });
      
      if (response.data?.message === 'success') {
        toast.success('Banner status updated successfully!');
        fetchBanner();
      }
    } catch (err) {
      console.error('Error toggling banner status:', err);
      toast.error('Failed to update banner status');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-md">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#55D5D2]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Banner Management</h1>
        <p className="text-sm text-gray-500 mt-1">Upload and manage your website banner</p>
      </div>

      <div className="max-w-4xl">
        {/* Current Banner Status */}
        {currentBanner && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Current Banner Status</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {currentBanner.updated_at || 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentBanner.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {currentBanner.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={handleToggleStatus}
                  disabled={uploading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#55D5D2] hover:bg-[#45c5c2] rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Toggle Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>

          {/* Drag and Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-xl transition-all ${
              isDragging
                ? 'border-[#55D5D2] bg-[#EFF9F9]'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            {previewUrl ? (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Banner preview"
                  className="w-full h-[400px] object-cover rounded-xl"
                />
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    title="Change image"
                  >
                    <FiUploadCloud className="w-6 h-6 text-gray-700" />
                  </button>
                  {selectedImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                      title="Remove selection"
                    >
                      <FiTrash2 className="w-6 h-6 text-red-500" />
                    </button>
                  )}
                </div>
                {/* Badge showing if image is new */}
                {selectedImage && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium flex items-center gap-1">
                    <FiImage className="w-3 h-3" />
                    New Image Selected
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FiUploadCloud className="mx-auto h-16 w-16 text-gray-400" />
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#55D5D2] hover:text-[#45c5c2] font-medium"
                  >
                    Click to upload
                  </button>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF, or WebP up to 10MB
                </p>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Manual File Upload Button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <FiImage className="w-4 h-4" />
              Choose File
            </button>
            <span className="text-sm text-gray-500">
              {selectedImage ? selectedImage.name : 'No file selected'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleUpdateBanner}
              disabled={!selectedImage || uploading}
              className="flex items-center gap-2 px-6 py-3 bg-[#55D5D2] text-white rounded-lg hover:bg-[#45c5c2] focus:outline-none focus:ring-2 focus:ring-[#55D5D2] focus:ring-opacity-50 font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  Update Banner
                </>
              )}
            </button>

            {selectedImage && (
              <button
                onClick={handleRemoveImage}
                disabled={uploading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Tips:</h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Recommended image size: 1920x1080 pixels for best quality</li>
              <li>Supported formats: JPEG, PNG, GIF, WebP</li>
              <li>Maximum file size: 10MB</li>
              <li>You can drag and drop an image directly onto the preview area</li>
              <li>Toggle the banner status to show or hide it on your website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannersPage;