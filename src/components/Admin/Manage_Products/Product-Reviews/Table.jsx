import React, { useState } from "react";
import Row from "./Row";

const Table = ({ reviews, isLoading, error, onStatusChange, onSearch, searchTerm, onDelete }) => {
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
            <th colspan="6" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Reviews</h1>
            </th>
          </tr>
          <tr>
            <th colSpan="6" className="py-2 px-4">
              <div className="flex items-center gap-2 justify-start">
                <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">Search </label>
                <input
                  id="searchId"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="border rounded-[10px] px-2 py-1 w-48 font-normal"
                  placeholder="ID, product or user..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[8%]">ID</th>
            <th className="py-2 px-4 text-left w-[20%]">Product</th>
            <th className="py-2 px-4 text-left w-[15%]">User</th>
            <th className="py-2 px-4 text-left w-[9%]">Rating</th>
            <th className="py-2 px-4 text-left w-[20%]">Review</th>
            <th className="py-2 px-4 text-left w-[10%]">Status</th>
            <th className="py-2 px-4 text-center w-[10%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            reviews.map((review) => (
              <Row 
                key={review.id} 
                review={review} 
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
