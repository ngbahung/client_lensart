import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Categories/Materials/Table';
import Pagination from "../../../components/Admin/Manage_Categories/Materials/Pagination";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Nhựa Acetate", status: "active" },
    { id: 2, name: "Titan", status: "inactive" },
    { id: 3, name: "Thép không gỉ", status: "active" },
    { id: 4, name: "Nhựa TR90", status: "inactive" },
    { id: 5, name: "Hợp kim", status: "active" },
    { id: 6, name: "Nhôm", status: "inactive" },
    { id: 7, name: "Nhựa Ultem", status: "active" },
    { id: 8, name: "Carbon Fiber", status: "inactive" },
    { id: 9, name: "Monel", status: "active" },
    { id: 10, name: "Beryllium", status: "inactive" },
    { id: 11, name: "Nhựa PC (Polycarbonate)", status: "active" },
    { id: 12, name: "Gỗ tự nhiên", status: "inactive" },
    { id: 13, name: "Nhựa Bio-acetate", status: "active" },
    { id: 14, name: "Titanium Beta", status: "inactive" },
    { id: 15, name: "Thép không gỉ 316L", status: "active" }
  ];

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/materials');
      if (response.status === 200 && response.data && response.data.data) {
        const allMaterials = response.data.data;
        setMaterials(allMaterials);
        setTotalPages(Math.ceil(allMaterials.length / ITEMS_PER_PAGE));
        setError(null);
        return true; // Add return value to indicate success
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Failed to fetch materials:", error);
      setMaterials(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      return false; // Add return value to indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(material => 
    material.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredMaterials.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (materialId) => {
    try {
      const currentMaterial = materials.find(mat => mat.id === materialId);
      const newStatus = currentMaterial.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8000/api/materials/switch-status/${materialId}`);
      
      if (response.status === 200) {
        setMaterials(prevMaterials => 
          prevMaterials.map(mat => 
            mat.id === materialId ? {...mat, status: newStatus} : mat
          )
        );
      }
    } catch (error) {
      alert("Failed to update material status");
      console.error("Failed to update material status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = materials.filter(material => 
      material.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      material.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            materials={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchMaterials}
          />
        </div>
      </div>
      {!isLoading && filteredMaterials.length > 0 && (
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

export default MaterialsPage;