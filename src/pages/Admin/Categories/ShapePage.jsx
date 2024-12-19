import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Categories/Shape/Table';
import Pagination from "../../../components/Admin/Manage_Categories/Shape/Pagination";

const ShapePage = () => {
  const [shapes, setShapes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Oval", status: "active" },
    { id: 2, name: "Rectangle", status: "active" },
    { id: 3, name: "Round", status: "active" },
    { id: 4, name: "Square", status: "inactive" },
    { id: 5, name: "Cat Eye", status: "inactive" },
    { id: 6, name: "Aviator", status: "active" },
    { id: 7, name: "Wayfarer", status: "active" },
    { id: 8, name: "Butterfly", status: "inactive" },
    { id: 9, name: "Geometric", status: "active" },
    { id: 10, name: "Browline", status: "active" },
    { id: 11, name: "Hexagonal", status: "inactive" },
    { id: 12, name: "Oversized", status: "active" }
  ];

  const fetchShapes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/shapes');
      if (response.data) {
        const allShapes = response.data.data || mockData;
        setShapes(allShapes);
        setTotalPages(Math.ceil(allShapes.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch shapes:", error);
      setShapes(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchShapes();
  }, []);

  const filteredShapes = shapes.filter(shape => 
    shape.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    shape.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredShapes.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (shapeId) => {
    try {
      const currentShape = shapes.find(shape => shape.id === shapeId);
      const newStatus = currentShape.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8000/api/shapes/switch-status/${shapeId}`);
      
      if (response.status === 200) {
        setShapes(prevShapes => 
          prevShapes.map(shape => 
            shape.id === shapeId ? {...shape, status: newStatus} : shape
          )
        );
      }
    } catch (error) {
      alert("Failed to update shape status");
      console.error("Failed to update shape status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = shapes.filter(shape => 
      shape.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      shape.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            shapes={getCurrentPageItems()} // Changed from categories to shapes
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchShapes} // Add this prop
          />
        </div>
      </div>
      {!isLoading && filteredShapes.length > 0 && (
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

export default ShapePage;