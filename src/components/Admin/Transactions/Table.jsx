import React from "react";
import { LuRefreshCcw } from "react-icons/lu";
import Row from "./Row";

const Table = ({ transactions, isLoading, error, onSearch, searchTerm, onRefresh }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      {error && (
        <div className="text-amber-600 mb-4 p-2 bg-amber-50 rounded">
          {error}
        </div>
      )}
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr className="border-b border-[rgba(167,174,174,1)]">
            <th colSpan="3" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Transactions</h1>
            </th>
            <th className="py-2 px-4 text-right">
              <button
                onClick={onRefresh}
                className="p-2 bg-[rgba(85,213,210,1)] text-white rounded-lg hover:opacity-80 transition-opacity"
                disabled={isLoading}
              >
                <LuRefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </th>
          </tr>
          <tr>
            <th colSpan="4" className="py-2 px-4">
              <div className="flex items-center gap-2 justify-start">
                <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">
                  Search by ID/Payment Method:
                </label>
                <input
                  id="searchId"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="border rounded-[10px] px-2 py-1 w-48 font-normal"
                  placeholder="Enter ID or payment method..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left">Transaction ID</th>
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Payment Method</th>
            <th className="py-2 px-4 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <Row 
                key={transaction.id} 
                transaction={transaction}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
