import { useState, useEffect } from 'react';
import axios from 'axios';

const BannersPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [bannerId, setBannerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [key, setKey] = useState(0); // Add this line

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/banner');
        if (response.data && response.data.image_url) {
          setPreviewUrl(response.data.image_url);
          console.log('Fetched banner:', response.data.image_url);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
        setPreviewUrl('https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-hinh-mat-kinh.jpg');
        setError('Using mock data - API connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [key]); // Add key to dependency array

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateBanner = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('image', selectedImage);
      console.log('Sending image:', selectedImage);

      const response = await axios.post(
        `http://localhost:8000/api/banner/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.image_url) {
        setPreviewUrl(response.data.image_url);
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Error updating banner:', err);
      setError('Failed to update banner');
      setKey(prev => prev + 1); // Force re-render on error
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
            ) : error && !previewUrl ? (
              <div className="text-red-500">{error}</div>
            ) : previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
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

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-5">
          <button
            className="w-1/8 py-2 px-4 bg-teal-400 text-white rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 font-medium transition-colors duration-200"
            onClick={handleUpdateBanner}
            disabled={loading || !selectedImage}
          >
            {loading ? 'Updating...' : 'Update Banner'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannersPage;