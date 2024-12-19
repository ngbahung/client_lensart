import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Categories/Features/Table';
import Pagination from "../../../components/Admin/Manage_Categories/Features/Pagination";

const FeaturesPage = () => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Polarized Lenses", status: true },
    { id: 2, name: "UV400 Protection", status: true },
    { id: 3, name: "Anti-Reflective Coating", status: true },
    { id: 4, name: "Blue Light Blocking", status: false },
    { id: 5, name: "Photochromic", status: true },
    { id: 6, name: "Scratch Resistant", status: true },
    { id: 7, name: "Impact Resistant", status: false },
    { id: 8, name: "Anti-Fog Coating", status: true },
    { id: 9, name: "Hydrophobic Coating", status: false },
    { id: 10, name: "High Index Lenses", status: true },
    { id: 11, name: "Progressive Lenses", status: false },
    { id: 12, name: "Bifocal Design", status: true }
  ];

  const refreshFeatures = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/features');
      if (response.data && response.data.data) {
        const allFeatures = response.data.data;
        setFeatures(allFeatures);
        setTotalPages(Math.ceil(allFeatures.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch features:", error);
      setFeatures(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshFeatures();
  }, []);

  const filteredFeatures = features.filter(feature => 
    feature.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredFeatures.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (featureId) => {
    try {
      const feature = features.find(f => f.id === featureId);
      const newStatus = !feature.status;
      
      const response = await axios.post(`http://localhost:8000/api/features/switch-status/${featureId}`);
      
      if (response.status === 200) {
        setFeatures(prevFeatures => 
          prevFeatures.map(feature => 
            feature.id === featureId ? {...feature, status: newStatus} : feature
          )
        );
      }
    } catch (error) {
      alert("Failed to update feature status");
      console.error("Failed to update feature status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = features.filter(feature => 
      feature.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      feature.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            features={getCurrentPageItems()} // Changed from categories to features
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onRefresh={refreshFeatures} // Add this prop
          />
        </div>
      </div>
      {!isLoading && filteredFeatures.length > 0 && (
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

export default FeaturesPage;