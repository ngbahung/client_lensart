import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Pagination from "./Pagination";
import PropTypes from 'prop-types';

const ImageGalleryPage = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 6; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    {
      id: 1,
      product_id: productId,
      image_url: "https://example.com/image1.jpg",
      image_public_id: "image1"
    },
    {
      id: 2,
      product_id: productId,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "How to Choose the Perfect Frames"
    },
    {
      id: 3,
      product_id: productId,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Caring for Your Glasses"
    },
    {
      id: 4,
      product_id: productId,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Understanding Lens Types"
    },
    {
      id: 5,
      product_id: productId,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Fashion and Function in Eyewear"
    },
    {
      id: 6,
      product_id: productId,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Children's Eye Health"
    }
  ];

  useEffect(() => {
    if (productId) {
      fetchImages();
    }
  }, [productId]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/product-images/getByProductId/${productId}`);
      if (response.data && response.data.data) {
        const allImages = response.data.data;
        setImages(allImages);
        setTotalPages(Math.ceil(allImages.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch images for product:", error);
      setImages(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = images.filter(image => 
    image.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredImages.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (imageId) => {
    try {
      const currentImage = images.find(image => image.id === imageId);
      const newStatus = currentImage.status === 'inactive' ? 'active' : 'inactive';
      
      const response = await axios.post(`http://localhost:8000/api/images/switch-status/${imageId}`);
      
      if (response.status === 200) {
        setImages(prevImages => 
          prevImages.map(image => 
            image.id === imageId ? {...image, status: newStatus} : image
          )
        );
      }
    } catch (error) {
      alert("Failed to update image status");
      console.error("Failed to update image status:", error);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/product-images/delete/${imageId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        setImages(prevImages => prevImages.filter(image => image.id !== imageId));
        setError(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete image';
      setError(errorMessage);
      console.error('Error deleting image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = images.filter(image => 
      image.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      image.title.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  const handleEditBlogSuccess = async () => {
    try {
      await fetchImages(); // Refresh data
    } catch (error) {
      console.error("Failed to refresh images:", error);
    }
  };

  const handleUpdateSuccess = () => {
    fetchImages(); // Gọi lại API để lấy dữ liệu mới
  };

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('product_id', productId);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/product-images/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.status === 200) {
        await fetchImages(); // Refresh the images list
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload image');
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Table
        images={images}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onUpdateSuccess={handleUpdateSuccess}
        onUpload={handleImageUpload}
        product_id={productId} // Truyền productId vào Table
      />
    </div>
  );
};

ImageGalleryPage.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ImageGalleryPage;