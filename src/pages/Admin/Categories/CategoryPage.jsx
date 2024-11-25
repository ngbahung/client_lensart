import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Categories/Category/Table';
import Pagination from "../../../components/Admin/Manage_Categories/Category/Pagination";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang

  const mockData = [
    { id: 1, name: "Gọng kính", status: false },
    { id: 2, name: "Tròng kính", status: true },
    { id: 3, name: "Gọng mắt", status: true },
    { id: 4, name: "Tròng mắt", status: false },
    { id: 5, name: "Kính mắt", status: true },
    { id: 6, name: "Kính râm", status: false },
    { id: 7, name: "Kính cận", status: true },
    { id: 8, name: "Kính cận", status: true },
    { id: 9, name: "Kính cận", status: false },
    { id: 10, name: "Kính cận", status: true },
    { id: 11, name: "Kính cận", status: false },
    { id: 12, name: "Kính cận", status: true },
    { id: 13, name: "Kính cận", status: false },
    { id: 14, name: "Kính cận", status: true },
    { id: 15, name: "Kính cận", status: false },
    { id: 16, name: "Kính cận", status: true },
    // ...existing mockData...
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        if (response.data) {
          const allCategories = response.data.data || mockData;
          setCategories(allCategories);
          // Tính tổng số trang dựa trên số lượng items
          setTotalPages(Math.ceil(allCategories.length / ITEMS_PER_PAGE));
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(mockData);
        setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Tính toán items cho trang hiện tại
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return categories.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (categoryId) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === categoryId ? {...cat, status: !cat.status} : cat
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            categories={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
      {!isLoading && (
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

export default CategoryPage;