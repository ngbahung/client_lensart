import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Users/ManagerList/Table';
import Pagination from "../../../components/Admin/Users/ManagerList/Pagination";

const ManagerListPage = () => {
  const [Managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "John Doe", status: "inactive" },
    { id: 2, name: "Jane Smith", status: "active" },
    { id: 3, name: "Gọng mắt", status: "active" },
    { id: 4, name: "Tròng mắt", status: "inactive" },
    { id: 5, name: "Kính mắt", status: "active" },
    { id: 6, name: "Kính râm", status: "inactive" },
    { id: 7, name: "Kính cận", status: "active" },
    { id: 8, name: "Kính lão", status: "inactive" },
    { id: 9, name: "Kính trẻ em", status: "active" },
    { id: 10, name: "Kính thời trang", status: "inactive" },
    { id: 11, name: "Kính đọc", status: "active" },
    { id: 12, name: "Kính chống nắng", status: "inactive" },
    { id: 13, name: "Kính thể thao", status: "active" },
    { id: 14, name: "Kính bơi", status: "inactive" },
    { id: 15, name: "Kính lái xe", status: "active" },
    { id: 16, name: "Kính gọng", status: "inactive" },
    { id: 17, name: "Kính tròn", status: "active" },
    { id: 18, name: "Kính vuông", status: "inactive" },
    { id: 19, name: "Kính chữ nhật", status: "active" },
    { id: 20, name: "Kính đen", status: "inactive" },
    { id: 21, name: "Kính xám", status: "active" },
    { id: 22, name: "Kính nâu", status: "inactive" },
    { id: 23, name: "Kính xanh", status: "active" },
    { id: 24, name: "Kính hồng", status: "inactive" },
    { id: 25, name: "Kính đỏ", status: "active" },
    { id: 26, name: "Kính cam", status: "inactive" },
    { id: 27, name: "Kính vàng", status: "active" },
    { id: 28, name: "Kính lục", status: "inactive" },
    { id: 29, name: "Kính tím", status: "active" },
    { id: 30, name: "Kính trắng", status: "inactive" },
    { id: 31, name: "Kính học", status: "active" },
    // ...existing mockData...
  ];

  const fetchManagers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/users/getByRole/2');
      if (response.data) {
        const allManagers = response.data.data || [];
        setManagers(allManagers);
        setTotalPages(Math.ceil(allManagers.length / ITEMS_PER_PAGE));
        setCurrentPage(1); // Reset về trang 1
        setSearchTerm(""); // Reset search term
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch Managers:", error);
      setError("Failed to load Managers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const filteredManagers = Managers.filter(Manager => 
    Manager.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${Manager.firstname} ${Manager.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Manager.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredManagers.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (ManagerId) => {
    try {
      const currentManager = Managers.find(cust => cust.id === ManagerId);
      const newStatus = currentManager.status === 'active' ? 'inactive' : 'active';

      const response = await axios.post(`http://localhost:8000/api/users/switch-status/${ManagerId}`);
      
      if (response.status === 200) {
        setManagers(prevManagers => 
          prevManagers.map(cust => 
            cust.id === ManagerId ? {...cust, status: newStatus} : cust
          )
        );
      }
    } catch (error) {
      alert("Failed to update Manager status");
      console.error("Failed to update Manager status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = Managers.filter(Manager => 
      Manager.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      Manager.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            Managers={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchManagers} // Truyền trực tiếp function fetchManagers
          />
        </div>
      </div>
      {!isLoading && filteredManagers.length > 0 && (
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

export default ManagerListPage;