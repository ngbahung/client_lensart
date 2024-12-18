import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "../../components/Admin/Branches/Table";  // Updated import path
import Pagination from "../../components/Admin/Branches/Pagination";  // Updated import path

const BranchesPage = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { 
      id: 1, 
      name: "Chi nhánh 1", 
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      managerName: "Nguyễn Văn A",
      status: 'active'
    },
    { 
      id: 2, 
      name: "Chi nhánh 2", 
      address: "456 Lê Lợi, Q5, TP.HCM",
      managerName: "Trần Thị B",
      status: 'inactive'
    },
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


  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/branches');
      if (response.data) {
        const allBranches = response.data.data || mockData;
        setBranches(allBranches);
        setTotalPages(Math.ceil(allBranches.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch branches:", error);
      setBranches(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const filteredBranches = branches.filter(branch => 
    branch.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBranches.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (branchId) => {
    try {
      const branch = branches.find(b => b.id === branchId);
      if (!branch) return;
      
      const newStatus = branch.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8000/api/branches/switch-status/${branchId}`);
      
      if (response.status === 200) {
        setBranches(prevBranches => 
          prevBranches.map(b => 
            b.id === branchId ? {...b, status: newStatus} : b
          )
        );
      }
    } catch (error) {
      console.error("Failed to update branch status:", error);
      alert("Failed to update branch status");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = branches.filter(branch => 
      branch.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      branch.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            branches={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdate={fetchBranches} // Add this prop
          />
        </div>
      </div>
      {!isLoading && filteredBranches.length > 0 && (
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

export default BranchesPage;