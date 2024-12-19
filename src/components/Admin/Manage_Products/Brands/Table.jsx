import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateBrand from "./CreateBrand";
import EditBrand from './EditBrand';

const Table = ({ brands, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

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

  const handleEdit = (brand) => {
    setEditingBrand(brand);
  };

  if (editingBrand) {
    return <EditBrand 
      brand={editingBrand}  // Changed from category to brand
      onClose={() => setEditingBrand(null)} 
      onUpdate={onUpdate}
    />;
  }

  if (showCreateForm) {
    return <CreateBrand 
      onClose={() => setShowCreateForm(false)} 
      onUpdate={onUpdate}
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
            <th className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Brands</h1>
            </th>
            <th></th>
            <th></th>
            <th className="py-2 px-4 text-right">
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
            <th className="py-2 px-4 text-left w-[20%]">ID</th>
            <th className="py-2 px-4 text-left w-[45%]">Name</th>
            <th className="py-2 px-4 text-left w-[15%]">Status</th>
            <th className="py-2 px-4 text-center w-[20%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            brands.map((brand) => (
              <Row 
                key={brand.id} 
                brand={brand} 
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
