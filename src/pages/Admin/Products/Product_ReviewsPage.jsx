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
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, productName: "Classic Eyewear", userName: "John Doe", rating: 5, comment: "Great product!", status: true },
    { id: 2, productName: "Sun Glass Pro", userName: "Jane Smith", rating: 4, comment: "Nice quality", status: false },
    { id: 3, productName: "Modern Eyewear", userName: "Alice Johnson", rating: 3, comment: "Average", status: true },
    { id: 4, productName: "Vintage Glasses", userName: "Bob Brown", rating: 2, comment: "Not good", status: false },
    { id: 5, productName: "Sporty Shades", userName: "Charlie Davis", rating: 5, comment: "Excellent!", status: true },
    { id: 6, productName: "Fashion Frames", userName: "Diana Evans", rating: 4, comment: "Stylish", status: false },
    { id: 7, productName: "Reading Glasses", userName: "Evan Foster", rating: 3, comment: "Okay", status: true },
    { id: 8, productName: "Blue Light Blockers", userName: "Fiona Green", rating: 4, comment: "Very useful", status: false },
    { id: 9, productName: "Polarized Sunglasses", userName: "George Harris", rating: 5, comment: "Perfect for outdoors", status: true },
    { id: 10, productName: "Kids Glasses", userName: "Hannah Irving", rating: 4, comment: "Good for children", status: false },
    { id: 11, productName: "Designer Eyewear", userName: "Ian Jackson", rating: 5, comment: "High quality", status: true },
    { id: 12, productName: "Budget Glasses", userName: "Jackie King", rating: 2, comment: "Cheap but not durable", status: false },
    { id: 13, productName: "Luxury Frames", userName: "Karen Lee", rating: 5, comment: "Worth the price", status: true },
    { id: 14, productName: "Eco-friendly Glasses", userName: "Larry Moore", rating: 4, comment: "Good for the environment", status: false },
    { id: 15, productName: "Titanium Glasses", userName: "Mona Nelson", rating: 5, comment: "Very strong", status: true }
  ];

  const refreshReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/reviews');
      if (response.data) {
        const allReviews = response.data.data || mockData;
        setReviews(allReviews);
        setTotalPages(Math.ceil(allReviews.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reviews');
        if (response.data) {
          const allReviews = response.data.data || mockData;
          setReviews(allReviews);
          // Tính tổng số trang dựa trên số lượng items
          setTotalPages(Math.ceil(allReviews.length / ITEMS_PER_PAGE));
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews(mockData);
        setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review => 
    review.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (review.userName || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      const newStatus = !currentReview.status;
      
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
      review.productName.toLowerCase().includes(value.toLowerCase()) ||
      (review.userName || '').toLowerCase().includes(value.toLowerCase())
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