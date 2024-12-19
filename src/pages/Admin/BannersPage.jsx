import { useState, useEffect } from 'react';
import axios from 'axios';

const BannersPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [bannerId, setBannerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/banners');
        if (response.data) {
          const { id, image_url } = response.data;
          setBannerId(id);
          setImageUrl(image_url);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
        setError('Failed to load banner data');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create new preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImageUrl(newPreviewUrl);

      // Cleanup old URL to prevent memory leaks
      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  };

  const handleUpdateBanner = async () => {
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      
      if (selectedImage) {
        // Convert new image to blob and append as image_url
        const imageBlob = new Blob([selectedImage], { type: selectedImage.type });
        formData.append('image_url', imageBlob, selectedImage.name);
      } else if (imageUrl) {
        // Use existing image URL
        formData.append('image_url', imageUrl);
      }

      const response = await axios.post(
        `http://localhost:8000/api/banners/update/${bannerId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // Refresh banner data after successful update
        const fetchResponse = await axios.get('http://localhost:8000/api/banners');
        if (fetchResponse.data) {
          const { id, image_url } = fetchResponse.data;
          setBannerId(id);
          setImageUrl(image_url);
        }
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Error updating banner:', err);
      setError('Failed to update banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgba(167,174,174,1)]">
            <th colSpan="3" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">Banner Setting</h1>
            </th>
          </tr>
        </thead>
      </table>
      <div className="flex flex-col gap-4 max-w-xl mt-10">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Preview Image</label>
          <div className="border rounded-lg p-4 flex items-center justify-center h-[300px] w-[300px] bg-gray-100 border-gray-300">
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : selectedImage ? (
              <img 
                src={URL.createObjectURL(selectedImage)} 
                alt="New preview" 
                className="max-w-full max-h-full object-contain"
                onLoad={() => URL.revokeObjectURL(selectedImage)} 
              />
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Current preview" 
                className="max-w-full max-h-full object-contain" 
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">Image URL</label>
          <div className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]">
            <div className="break-words text-sm overflow-hidden text-ellipsis">
              {imageUrl || 'No image URL'}
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-5">
          <button
            className="w-1/8 py-2 px-4 bg-teal-400 text-white rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 font-medium transition-colors duration-200"
            onClick={handleUpdateBanner}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Banner'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannersPage;