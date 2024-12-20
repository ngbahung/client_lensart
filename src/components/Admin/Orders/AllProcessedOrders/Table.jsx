import React, { useState } from "react";
import axios from 'axios';
import Row from "./Row";
import Detail from "./Detail";

const Table = ({ orders, isLoading, error, onSearch, searchTerm, onUpdateSuccess }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  if (showDetail && selectedOrder) {
    return (
      <Detail
        order={selectedOrder}
        onClose={() => {
          setShowDetail(false);
          setSelectedOrder(null);
        }}
        onUpdate={onUpdateSuccess}
      />
    );
  }

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
            <th colspan="6" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Orders</h1>
            </th>
          </tr>
          <tr>
            <th colSpan="6" className="py-2 px-4">
              <div className="flex items-center gap-2 justify-start">
                <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">Search: </label>
                <input
                  id="searchId"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="border rounded-[10px] px-2 py-1 w-64 font-normal"
                  placeholder="Search by ID, Name, Date..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[10%]">ID</th>
            <th className="py-2 px-4 text-left w-[20%]">Customer Name</th>
            <th className="py-2 px-4 text-left w-[15%]">Amount</th>
            <th className="py-2 px-4 text-left w-[15%]">Date</th>
            <th className="py-2 px-4 text-left w-[15%]">Order Status</th>
            <th className="py-2 px-4 text-left w-[15%]">Payment Status</th>
            <th className="py-2 px-4 text-center w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            orders.map((order) => (
              <Row 
                key={order.id} 
                order={order}
                onShowDetail={handleShowDetail}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
