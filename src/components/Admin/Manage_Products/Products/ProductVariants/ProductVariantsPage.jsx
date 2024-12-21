import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Pagination from "./Pagination";
import PropTypes from 'prop-types';

const ProductVariantsPage = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 30; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");


  const fetchVariants = async () => {
    if (!productId) {
      setError("Invalid product ID");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/product-details/getByProductId/${productId}`);
      

      if (response.data && response.data.data) {
        // Đảm bảo mỗi variant có status và các trường cần thiết
        const processedVariants = response.data.data.map(variant => ({
          ...variant,
          id: variant.id || 0,
          branch_id: variant.branch_id || 0,
          color: variant.color || '',
          quantity: variant.quantity || 0
        }));

        
        setVariants(processedVariants);
        setTotalPages(Math.ceil(processedVariants.length / ITEMS_PER_PAGE));
        setError(null);
      } else {
        setVariants([]);
        setError("No variants data received");
      }
    } catch (error) {
      console.error("Failed to fetch variants:", error);
      setError("Failed to load variants");
      setVariants([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  const filteredVariants = variants.filter(variant => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase().trim();
    return (
      (variant?.id?.toString() || '').toLowerCase().includes(searchTermLower) ||
      (variant?.color || '').toLowerCase().includes(searchTermLower)
    );
  });

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredVariants.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase().trim();
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = variants.filter(variant => {
      if (!searchValue) return true;
      return (
        (variant?.id?.toString() || '').toLowerCase().includes(searchValue) ||
        (variant?.color || '').toLowerCase().includes(searchValue)
      );
    });
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table
            variants={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchVariants}
            productId={productId}
          />
        </div>
      </div>
      {!isLoading && filteredVariants.length > 0 && (
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

ProductVariantsPage.propTypes = {
  productId: PropTypes.number.isRequired
};

export default ProductVariantsPage;