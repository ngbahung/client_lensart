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
      branch_name: "Chi nhánh 1", // Changed from name to branch_name
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      manager_name: "Nguyễn Văn A",
      index: 1,
      status: 'active'
    },
    { 
      id: 2, 
      branch_name: "Chi nhánh 2", // Changed from name to branch_name
      address: "456 Lê Lợi, Q5, TP.HCM",
      manager_name: "Trần Thị B",
      index: 2,
      status: 'inactive'
    },
    { id: 3, branch_name: "Thép không gỉ", status: true },
    { id: 4, branch_name: "Nhựa TR90", status: false },
    { id: 5, branch_name: "Hợp kim", status: true },
    { id: 6, branch_name: "Nhôm", status: false },
    { id: 7, branch_name: "Nhựa Ultem", status: true },
    { id: 8, branch_name: "Carbon Fiber", status: false },
    { id: 9, branch_name: "Monel", status: true },
    { id: 10, branch_name: "Beryllium", status: false },
    { id: 11, branch_name: "Nhựa PC (Polycarbonate)", status: true },
    { id: 12, branch_name: "Gỗ tự nhiên", status: false },
    { id: 13, branch_name: "Nhựa Bio-acetate", status: true },
    { id: 14, branch_name: "Titanium Beta", status: false },
    { id: 15, branch_name: "Thép không gỉ 316L", status: true }
  ];


  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/branches');
      if (response.data) {
        const allBranches = response.data.data || mockData;
        // Standardize field names
        const standardizedBranches = allBranches.map(branch => ({
          id: branch.id,
          branch_name: branch.branch_name || branch.name,
          address: branch.address || '',
          manager_name: branch.manager_name || 'N/A',
          index: branch.index || 0,
          status: branch.status
        }));
        setBranches(standardizedBranches);
        setTotalPages(Math.ceil(standardizedBranches.length / ITEMS_PER_PAGE));
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
    branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
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
      branch.branch_name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  const handleEdit = async (branchId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/branches/${branchId}`, updatedData);
      
      if (response.status === 200) {
        // Update local state with edited data
        setBranches(prevBranches =>
          prevBranches.map(branch =>
            branch.id === branchId ? { ...branch, ...updatedData } : branch
          )
        );
        return true; // Return success status
      }
    } catch (error) {
      console.error("Failed to update branch:", error);
      alert("Failed to update branch");
      return false;
    }
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
            onEdit={handleEdit} // Add onEdit prop
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