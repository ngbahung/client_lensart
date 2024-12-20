import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Products/Product-Reviews/Table';
import Pagination from "../../../components/Admin/Manage_Products/Product-Reviews/Pagination";

const Product_ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 8; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, productName: "Classic Eyewear", userName: "John Doe", rating: 5, review: "Great product!", status: "active" },
    { id: 2, productName: "Sun Glass Pro", userName: "Jane Smith", rating: 4, review: "Nice quality", status: "inactive" },
    { id: 3, productName: "Modern Eyewear", userName: "Alice Johnson", rating: 3, review: "Average", status: "active" },
    { id: 4, productName: "Vintage Glasses", userName: "Bob Brown", rating: 2, review: "Not good", status: "inactive" },
    { id: 5, productName: "Sporty Shades", userName: "Charlie Davis", rating: 5, review: "Excellent!", status: "active" },
    { id: 6, productName: "Fashion Frames", userName: "Diana Evans", rating: 4, review: "Stylish", status: "inactive" },
    { id: 7, productName: "Reading Glasses", userName: "Evan Foster", rating: 3, review: "Okay", status: "active" },
    { id: 8, productName: "Blue Light Blockers", userName: "Fiona Green", rating: 4, review: "Very useful", status: "inactive" },
    { id: 9, productName: "Polarized Sunglasses", userName: "George Harris", rating: 5, review: "Perfect for outdoors", status: "active" },
    { id: 10, productName: "Kids Glasses", userName: "Hannah Irving", rating: 4, review: "Good for children", status: "inactive" },
    { id: 11, productName: "Designer Eyewear", userName: "Ian Jackson", rating: 5, review: "High quality", status: "active" },
    { id: 12, productName: "Budget Glasses", userName: "Jackie King", rating: 2, review: "Cheap but not durable", status: "inactive" },
    { id: 13, productName: "Luxury Frames", userName: "Karen Lee", rating: 5, review: "Worth the price", status: "active" },
    { id: 14, productName: "Eco-friendly Glasses", userName: "Larry Moore", rating: 4, review: "Good for the environment", status: "inactive" },
    { id: 15, productName: "Titanium Glasses", userName: "Mona Nelson", rating: 5, review: "Very strong", status: "active" }
  ];

  const refreshReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/reviews');
      if (response.data) {
        const reviewsData = response.data.data || [];
        // Ensure all required fields are present
        const formattedReviews = reviewsData.map(review => ({
          id: review.id,
          product_name: review.product_name || 'Unknown Product',
          user_name: review.user_name || 'Unknown User',
          rating: review.rating || 0,
          review: review.review || '',
          status: review.status || 'inactive'
        }));
        setReviews(formattedReviews);
        setTotalPages(Math.ceil(formattedReviews.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const filteredReviews = reviews.filter(review => 
    review.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredReviews.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (reviewId) => {
    try {
      // Find current review and get its current status
      const currentReview = reviews.find(rev => rev.id === reviewId);
      const newStatus = currentReview.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8000/api/reviews/switch-status/${reviewId}`);
      
      if (response.status === 200) {
        setReviews(prevReviews => 
          prevReviews.map(rev => 
            rev.id === reviewId ? {...rev, status: newStatus} : rev
          )
        );
      }
    } catch (error) {
      alert("Failed to update review status");
      console.error("Failed to update review status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = reviews.filter(review => 
      review.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      review.product_name.toLowerCase().includes(value.toLowerCase()) ||
      (review.user_name || '').toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/reviews/delete/${reviewId}`);
      
      if (response.status === 200) {
        // Remove the deleted review from state
        setReviews(prevReviews => prevReviews.filter(rev => rev.id !== reviewId));
        // Recalculate total pages
        const remainingItems = filteredReviews.length - 1;
        setTotalPages(Math.ceil(remainingItems / ITEMS_PER_PAGE));
        // Adjust current page if necessary
        if (remainingItems > 0 && getCurrentPageItems().length === 1) {
          setCurrentPage(prev => Math.max(1, prev - 1));
        }
      }
    } catch (error) {
      alert("Failed to delete review");
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            reviews={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            refreshReviews={refreshReviews}
            onDelete={handleDelete}  // Add this prop
          />
        </div>
      </div>
      {!isLoading && filteredReviews.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Product_ReviewsPage;