import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Admin/Transactions/Table';
import Pagination from "../../components/Admin/Transactions/Pagination";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 9;
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    {
      id: 1,
      orderCode: 100001,
      order_id: 1,
      amount: 490000,
      created_at: "19/12/2024 13:33:04",
      order: {
        payment_method: "Chuyển khoản",
        payment_status: "Đã thanh toán"
      }
    }
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/transactions');
      if (response.data && response.data.status === "success") {
        const allTransactions = response.data.data || mockData;
        const standardizedTransactions = allTransactions.map(transaction => ({
          id: transaction.id,
          order_id: transaction.orderCode?.toString() || 'N/A',
          payment_method: transaction.order?.payment_method || 'N/A',
          amount: transaction.amount?.toString() || '0',
          created_at: transaction.created_at || 'N/A'
        }));
        setTransactions(standardizedTransactions);
        setTotalPages(Math.ceil(standardizedTransactions.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
      setError("Failed to fetch transactions. Using mock data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Call refresh endpoint first
      await axios.post('http://localhost:8000/api/transactions/refresh');
      // Then fetch updated data
      await fetchTransactions();
    } catch (error) {
      console.error("Failed to refresh transactions:", error);
      setError("Failed to refresh transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = transactions.filter(transaction => 
      transaction.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      transaction.order_id.toLowerCase().includes(value.toLowerCase()) ||
      transaction.payment_method.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            transactions={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
      {!isLoading && filteredTransactions.length > 0 && (
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

export default TransactionsPage;