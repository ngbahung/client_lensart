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
    { id: 1, name: "Nhựa Acetate", status: true },
    { id: 2, name: "Titan", status: false },
    { id: 3, name: "Thép không gỉ", status: true },
    { id: 4, name: "Nhựa TR90", status: false },
    { id: 5, name: "Hợp kim", status: true },
    { id: 6, name: "Nhôm", status: false },
    { id: 7, name: "Nhựa Ultem", status: true },
    { id: 8, name: "Carbon Fiber", status: false },
    { id: 9, name: "Monel", status: true },
    { id: 10, name: "Beryllium", status: false },
    { id: 11, name: "Nhựa PC (Polycarbonate)", status: true },
    { id: 12, name: "Gỗ tự nhiên", status: false },
    { id: 13, name: "Nhựa Bio-acetate", status: true },
    { id: 14, name: "Titanium Beta", status: false },
    { id: 15, name: "Thép không gỉ 316L", status: true }
  ];

  const refreshMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/materials');
      if (response.data) {
        const allMaterials = response.data.materials || mockData;
        setMaterials(allMaterials);
        setTotalPages(Math.ceil(allMaterials.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch materials:", error);
      setMaterials(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/materials');
        if (response.data) {
          const allMaterials = response.data.materials || mockData;
          setMaterials(allMaterials);
          // Tính tổng số trang dựa trên số lượng items
          setTotalPages(Math.ceil(allMaterials.length / ITEMS_PER_PAGE));
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch materials:", error);
        setMaterials(mockData);
        setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(material => 
    material.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được l���c
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredMaterials.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (materialId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/materials/${materialId}/status`, {
        status: newStatus
      });
      
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
      // Optionally add error handling here
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
            refreshMaterials={refreshMaterials}
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