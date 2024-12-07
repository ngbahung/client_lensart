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
    { id: 1, name: "Ray-Ban", status: true },
    { id: 2, name: "Oakley", status: true },
    { id: 3, name: "Gucci", status: false },
    { id: 4, name: "Prada", status: true },
    { id: 5, name: "Versace", status: false },
    { id: 6, name: "Tom Ford", status: true },
    { id: 7, name: "Burberry", status: false },
    { id: 8, name: "Chanel", status: true },
    { id: 9, name: "Nike Vision", status: true },
    { id: 10, name: "Dior", status: false },
    { id: 11, name: "Carrera", status: true },
    { id: 12, name: "Fendi", status: false },
    { id: 13, name: "Michael Kors", status: true },
    { id: 14, name: "Hugo Boss", status: true },
    { id: 15, name: "Persol", status: false },
    { id: 16, name: "Emporio Armani", status: true },
    { id: 17, name: "Vogue Eyewear", status: false },
    { id: 18, name: "Maui Jim", status: true },
    { id: 19, name: "Ralph Lauren", status: false },
    { id: 20, name: "Calvin Klein", status: true }
  ];

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/brands');
      if (response.data) {
        const allBrands = response.data.brands || mockData;
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

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
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
      const response = await axios.post(`http://localhost:8000/api/brands/switch-status/${brandId}`);
      
      if (response.status === 200) {
        setBrands(prevBrands => 
          prevBrands.map(brand => 
            brand.id === brandId ? {...brand, status: !brand.status} : brand
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
            refreshBrands={fetchBrands}  // Add this line
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