import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateCoupon from "./CreateCoupon";
import EditCoupon from './EditCoupon';

const Table = ({ coupons, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleShowCreate = () => {
    setShowCreateForm(true);
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
  };

  if (editingCoupon) {
    return <EditCoupon 
      coupon={editingCoupon} 
      onClose={() => setEditingCoupon(null)} 
      onUpdate={onUpdate}  // Truyền onUpdate xuống
    />;
  }

  if (showCreateForm) {
    return <CreateCoupon 
      onClose={() => setShowCreateForm(false)}
      onUpdate={onUpdate}  // Truyền onUpdate xuống
    />;
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
            <th colSpan="6" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Coupons</h1>
            </th>
            <th colSpan="1" className="py-2 px-4 text-right">
              <button 
                onClick={handleShowCreate}
                className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2 ml-auto"
              >
                <FiPlusCircle className="w-5 h-5" /> Create New
              </button>
            </th>
          </tr>
          <tr>
            <th colSpan="4" className="py-2 px-4">
              <div className="flex items-center gap-2 justify-start">
                <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">Search </label>
                <input
                  id="searchId"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="border rounded-[10px] px-2 py-1 w-48 font-normal"
                  placeholder="ID or name..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[5%]">ID</th>
            <th className="py-2 px-4 text-left w-[20%]">Name</th>
            <th className="py-2 px-4 text-left w-[15%]">Code</th>
            <th className="py-2 px-4 text-left w-[10%]">Quantity</th>
            <th className="py-2 px-4 text-left w-[15%]">Discount Price</th>
            <th className="py-2 px-4 text-left w-[10%]">Status</th>
            <th className="py-2 px-4 text-center w-[15%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            coupons.map((coupon) => (
              <Row 
                key={coupon.id} 
                coupon={coupon} 
                onStatusChange={onStatusChange}
                onEdit={handleEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
