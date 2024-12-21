import { useState, useEffect } from 'react';
import axios from 'axios';

const BannersPage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/banners');
        if (response.data && response.data.length > 0) {
          setPreviewUrls(response.data.map(banner => banner.image_url));
          console.log('Fetched banners:', response.data);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Using mock data - API connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [key]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleUpdateBanners = async () => {
    if (selectedImages.length === 0) {
      setError('Please select at least one image');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });
      console.log('Sending images:', selectedImages);

      const response = await axios.post(
        `http://localhost:8000/api/banners/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.length > 0) {
        setPreviewUrls(response.data.map(banner => banner.image_url));
        setSelectedImages([]);
      }
    } catch (err) {
      console.error('Error updating banners:', err);
      setError('Failed to update banners');
      setKey(prev => prev + 1);
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
          <label className="block text-gray-700 font-medium mb-2">Preview Images</label>
          <div className="border rounded-lg p-4 flex flex-wrap gap-4 bg-gray-100 border-gray-300">
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : error && previewUrls.length === 0 ? (
              <div className="text-red-500">{error}</div>
            ) : previewUrls.length > 0 ? (
              previewUrls.map((url, index) => (
                <img 
                  key={index}
                  src={url} 
                  alt={`Preview ${index}`} 
                  className="max-w-[150px] max-h-[150px] object-contain" 
                />
              ))
            ) : (
              <div className="text-gray-400">No images available</div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-5">
          <button
            className="w-1/8 py-2 px-4 bg-teal-400 text-white rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 font-medium transition-colors duration-200"
            onClick={handleUpdateBanners}
            disabled={loading || selectedImages.length === 0}
          >
            {loading ? 'Updating...' : 'Update Banners'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannersPage;