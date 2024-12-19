import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Manage_Products/Brands/Table';
import Pagination from "../../../components/Admin/Manage_Products/Brands/Pagination";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "Ray-Ban", status: "active" },
    { id: 2, name: "Oakley", status: "active" },
    { id: 3, name: "Tom Ford", status: "inactive" },
    { id: 4, name: "Gucci", status: "active" },
    { id: 5, name: "Prada", status: "active" },
    { id: 6, name: "Versace", status: "inactive" },
    { id: 7, name: "Burberry", status: "active" },
    { id: 8, name: "Chanel", status: "active" },
    { id: 9, name: "Nike Vision", status: "inactive" },
    { id: 10, name: "Dior", status: "active" }
  ];

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/brands');
      if (response.data) {
        const allBrands = response.data.data || mockData;
        setBrands(allBrands);
        setTotalPages(Math.ceil(allBrands.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      setBrands(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);


  const filteredBrands = brands.filter(brand => 
    brand.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBrands.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (brandId) => {
    try {
      const currentBrand = brands.find(brand => brand.id === brandId);
      const newStatus = currentBrand.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8000/api/brands/switch-status/${brandId}`);
      
      if (response.status === 200) {
        setBrands(prevBrands => 
          prevBrands.map(brand => 
            brand.id === brandId ? {...brand, status: newStatus} : brand
          )
        );
      }
    } catch (error) {
      alert("Failed to update brand status");
      console.error("Failed to update brand status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = brands.filter(brand => 
      brand.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            brands={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchBrands}
          />
        </div>
      </div>
      {!isLoading && filteredBrands.length > 0 && (
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

export default BrandsPage;