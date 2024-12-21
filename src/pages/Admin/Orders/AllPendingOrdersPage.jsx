import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../components/Admin/Orders/AllPendingOrders/Table';
import Pagination from "../../../components/Admin/Orders/AllPendingOrders/Pagination";

const AllPendingOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 6; // Số lượng items mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    {
      id: 1,
      customer_name: "John Doe",
      amount: 29999,
      date: "2024-01-15",
      order_status: "Đang xử lý", // Backend still uses Vietnamese
      payment_status: "Chưa thanh toán"
    },
    {
      id: 2,
      customer_name: "Jane Smith",
      amount: 19999,
      date: "2024-01-16",
      order_status: "Đã xử lý và sẵn sàng giao hàng",
      payment_status: "Đã thanh toán"
    },
    {
      id: 3,
      customer_name: "Alice Johnson",
      amount: 39999,
      date: "2024-01-17",
      order_status: "Đang giao hàng",
      payment_status: "Đã thanh toán"
    },
    {
      id: 4,
      customer_name: "Bob Brown",
      amount: 49999,
      date: "2024-01-18",
      order_status: "Đã hủy",
      payment_status: "Chưa thanh toán"
    },
    {
      id: 5,
      customer_name: "Charlie Davis",
      amount: 59999,
      date: "2024-01-19",
      order_status: "Đã giao",
      payment_status: "Đã thanh toán"
    },
    {
      id: 6,
      customer_name: "Diana Evans",
      amount: 69999,
      date: "2024-01-20",
      order_status: "Đang xử lý",
      payment_status: "Chưa thanh toán"
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const mapOrderData = (orderData) => {
    return {
      id: orderData.id,
      customer_name: orderData.user?.name || "Unknown",
      amount: orderData.total_amount,
      date: new Date(orderData.created_at).toLocaleDateString(),
      order_status: mapOrderStatus(orderData.status),
      payment_status: mapPaymentStatus(orderData.payment_status)
    };
  };

  const mapOrderStatus = (status) => {
    const statusMap = {
      'processing': 'Đang xử lý',
      'processed': 'Đã xử lý và sẵn sàng giao hàng',
      'shipping': 'Đang giao hàng',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const mapPaymentStatus = (status) => {
    const statusMap = {
      'paid': 'Đã thanh toán',
      'unpaid': 'Chưa thanh toán'
    };
    return statusMap[status] || status;
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    const status = "Đang xử lý";
    try {
      const response = await axios.get(`http://localhost:8000/api/orders/getByStatus/${status}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setOrders(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / ITEMS_PER_PAGE));
        setError(null);
      } else {
        setOrders(mockData);
        setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "Processing";
      case "Đã xử lý và sẵn sàng giao hàng":
        return "Processed and Ready to Ship";
      case "Đang giao hàng":
        return "Shipping";
      case "Đã hủy":
        return "Cancelled";
      case "Đã giao":
        return "Delivered";
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (status) => {
    switch (status) {
      case "Chưa thanh toán":
        return "Unpaid";
      case "Đã thanh toán":
        return "Paid";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().toLowerCase().includes(searchLower) ||
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.date.toLowerCase().includes(searchLower) ||
      getOrderStatusLabel(order.order_status).toLowerCase().includes(searchLower) ||
      getPaymentStatusLabel(order.payment_status).toLowerCase().includes(searchLower)
    );
  });

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = orders.filter(order => {
      const searchLower = value.toLowerCase();
      return (
        order.id.toString().toLowerCase().includes(searchLower) ||
        order.customer_name.toLowerCase().includes(searchLower) ||
        order.date.toLowerCase().includes(searchLower) ||
        getOrderStatusLabel(order.order_status).toLowerCase().includes(searchLower) ||
        getPaymentStatusLabel(order.payment_status).toLowerCase().includes(searchLower)
      );
    });
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };



  const handleUpdateSuccess = () => {
    setCurrentPage(1); // Reset to first page
    fetchOrders(); // Reload the orders
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            orders={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      </div>
      {!isLoading && filteredOrders.length > 0 && (
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

export default AllPendingOrdersPage;