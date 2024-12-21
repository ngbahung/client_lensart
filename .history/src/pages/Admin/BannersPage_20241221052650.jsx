import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BannersPage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [key, setKey] = useState(0);
  const MAX_IMAGES = 5; // Maximum number of banner images allowed

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/banner', {
          params: { status: 'active' }
        });
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
    const totalImages = selectedImages.length + files.length;

    if (totalImages > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    const totalImages = selectedImages.length + droppedFiles.length;
    
    if (totalImages > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    setSelectedImages(prev => [...prev, ...droppedFiles]);
    setPreviewUrls(prev => [...prev, ...droppedFiles.map(file => URL.createObjectURL(file))]);
  }, [selectedImages]);

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
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
        formData.append(`status_${index}`, 'active'); // Add status for each image
      });
      formData.append('status', 'active'); // Add general status

      console.log('Sending images:', selectedImages);

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
      <div className="flex flex-col gap-4 max-w-4xl mt-10">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Preview Images ({selectedImages.length}/{MAX_IMAGES})
          </label>
          <div 
            className="border rounded-lg p-4 min-h-[200px] bg-gray-100 border-gray-300"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <div className="text-gray-400">Loading...</div>
              ) : previewUrls.length > 0 ? (
                previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Preview ${index}`} 
                      className="w-full h-48 object-cover rounded-lg" 
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400 p-8 border-2 border-dashed rounded-lg">
                  Drag and drop images here or use the upload button below
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2 mt-4">
            Upload Images (Max {MAX_IMAGES})
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            disabled={selectedImages.length >= MAX_IMAGES}
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-5 flex justify-between">
          <button
            className="py-2 px-4 bg-teal-400 text-white rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 font-medium transition-colors duration-200 disabled:bg-gray-300"
            onClick={handleUpdateBanners}
            disabled={loading || selectedImages.length === 0}
          >
            {loading ? 'Updating...' : `Update Banners (${selectedImages.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannersPage;