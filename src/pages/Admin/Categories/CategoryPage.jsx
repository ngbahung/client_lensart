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
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Gọng kính", status: false },
    { id: 2, name: "Tròng kính", status: true },
    { id: 3, name: "Gọng mắt", status: true },
    { id: 4, name: "Tròng mắt", status: false },
    { id: 5, name: "Kính mắt", status: true },
    { id: 6, name: "Kính râm", status: false },
    { id: 7, name: "Kính cận", status: true },
    { id: 8, name: "Kính lão", status: false },
    { id: 9, name: "Kính trẻ em", status: true },
    { id: 10, name: "Kính thời trang", status: false },
    { id: 11, name: "Kính đọc", status: true },
    { id: 12, name: "Kính chống nắng", status: false },
    { id: 13, name: "Kính thể thao", status: true },
    { id: 14, name: "Kính bơi", status: false },
    { id: 15, name: "Kính lái xe", status: true },
    { id: 16, name: "Kính gọng", status: false },
    { id: 17, name: "Kính tròn", status: true },
    { id: 18, name: "Kính vuông", status: false },
    { id: 19, name: "Kính chữ nhật", status: true },
    { id: 20, name: "Kính đen", status: false },
    { id: 21, name: "Kính xám", status: true },
    { id: 22, name: "Kính nâu", status: false },
    { id: 23, name: "Kính xanh", status: true },
    { id: 24, name: "Kính hồng", status: false },
    { id: 25, name: "Kính đỏ", status: true },
    { id: 26, name: "Kính cam", status: false },
    { id: 27, name: "Kính vàng", status: true },
    { id: 28, name: "Kính lục", status: false },
    { id: 29, name: "Kính tím", status: true },
    { id: 30, name: "Kính trắng", status: false },
    { id: 31, name: "Kính học", status: true },
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

  const refreshCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      if (response.data) {
        const allCategories = response.data.data || mockData;
        setCategories(allCategories);
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
  

  const filteredCategories = categories.filter(category => 
    category.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCategories.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (categoryId) => {
    try {
      const currentCategory = categories.find(cat => cat.id === categoryId);
      const newStatus = !currentCategory.status;

      const response = await axios.post(`http://localhost:8000/api/categories/switch-status/${categoryId}`);
      
      if (response.status === 200) {
        setCategories(prevCategories => 
          prevCategories.map(cat => 
            cat.id === categoryId ? {...cat, status: newStatus} : cat
          )
        );
      }
    } catch (error) {
      alert("Failed to update category status");
      console.error("Failed to update category status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = categories.filter(category => 
      category.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
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
            onSearch={handleSearch}
            searchTerm={searchTerm}
            refreshCategories={refreshCategories}
          />
        </div>
      </div>
      {!isLoading && filteredCategories.length > 0 && (
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