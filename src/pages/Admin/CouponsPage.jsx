import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Admin/Coupons/Table';
import Pagination from "../../components/Admin/Coupons/Pagination";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: 1, name: "SUMMER2023", status: true },
    { id: 2, name: "FALL2023", status: false },
    { id: 3, name: "WINTER2023", status: true },
    { id: 4, name: "SPRING2023", status: false },
    { id: 5, name: "HOLIDAY2023", status: true },
    { id: 6, name: "NEWYEAR2023", status: false },
    { id: 7, name: "BLACKFRIDAY2023", status: true },
    { id: 8, name: "CYBERMONDAY2023", status: false },
    { id: 9, name: "CHRISTMAS2023", status: true },
    { id: 10, name: "EASTER2023", status: false },
    { id: 11, name: "VALENTINE2023", status: true },
    { id: 12, name: "HALLOWEEN2023", status: false },
    { id: 13, name: "BACKTOSCHOOL2023", status: true },
    { id: 14, name: "LABORDAY2023", status: false },
    { id: 15, name: "MEMORIALDAY2023", status: true }
  ];

  const refreshCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/coupons');
      if (response.data) {
        const allCoupons = response.data.data || mockData;
        setCoupons(allCoupons);
        setTotalPages(Math.ceil(allCoupons.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setCoupons(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/coupons');
        if (response.data) {
          const allCoupons = response.data.data || mockData;
          setCoupons(allCoupons);
          // Tính tổng số trang dựa trên số lượng items
          setTotalPages(Math.ceil(allCoupons.length / ITEMS_PER_PAGE));
          setError(null);
        }
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setCoupons(mockData);
        setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const filteredCoupons = coupons.filter(coupon => 
    coupon.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCoupons.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (couponId) => {
    try {
      // Find current coupon and get its current status
      const currentCoupon = coupons.find(coup => coup.id === couponId);
      const newStatus = !currentCoupon.status;
      
      const response = await axios.post(`http://localhost:8000/api/coupons/switch-status/${couponId}`);
      
      if (response.status === 200) {
        setCoupons(prevCoupons => 
          prevCoupons.map(coup => 
            coup.id === couponId ? {...coup, status: newStatus} : coup
          )
        );
      }
    } catch (error) {
      alert("Failed to update coupon status");
      console.error("Failed to update coupon status:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = coupons.filter(coupon => 
      coupon.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      coupon.name.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            coupons={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            refreshCoupons={refreshCoupons}
          />
        </div>
      </div>
      {!isLoading && filteredCoupons.length > 0 && (
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

export default CouponsPage;