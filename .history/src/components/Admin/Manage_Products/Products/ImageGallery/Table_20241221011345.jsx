import React, { useState, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import Row from "./Row";

const Table = ({ images, isLoading, error, onDelete, onUpdateSuccess, onUpload, product_id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    console.log('handleUpload called');
    console.log('selectedFile:', selectedFile);
    console.log('product_id:', product_id);

    if (!selectedFile || !product_id) {
      console.log('Missing selectedFile or product_id');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('product_id', product_id);

      console.log(formData);
      const response = await fetch('http://localhost:8000/api/product-images/create', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Upload failed: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setSelectedFile(null);
      setPreview(null);
      if (onUpdateSuccess) {
        onUpdateSuccess(data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      onUpload(file);
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      {error && (
        <div className="text-red-600 mb-4 p-2 bg-red-50 rounded border border-red-200">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Top section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-[rgba(236, 144, 92, 1)]">Image Gallery</h1>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[rgba(236,144,92,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2"
            >
              <FiUpload className="w-5 h-5" /> Browse File
            </button>
          </div>
        </div>

        {/* Preview section */}
        {preview && (
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FiX size={16} />
                </button>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table section */}
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[20%]">ID</th>
            <th className="py-2 px-4 text-left w-[60%]">Image</th>
            <th className="py-2 px-4 text-center w-[20%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            images.map((image) => (
              <Row 
                key={image.id} 
                image={image} 
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
