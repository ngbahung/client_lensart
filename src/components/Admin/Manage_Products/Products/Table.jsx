import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateProduct from "./CreateProduct";
import EditProduct from './EditProduct';

const Table = ({ products, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingProduct(null);
  };

  const handleUpdateAndClose = async () => {
    try {
      const success = await onUpdate();
      if (success) {
        handleCloseForm();
      }
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  if (editingProduct) {
    return <EditProduct 
      product={editingProduct}
      onClose={handleCloseForm}
      onUpdate={handleUpdateAndClose}
    />;
  }

  if (showCreateForm) {
    return <CreateProduct 
      onClose={handleCloseForm}
      onUpdate={handleUpdateAndClose}
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
            <th colSpan="6" className="py-2 px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">All Products</h1>
                <button 
                  onClick={handleShowCreate}
                  className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2"
                >
                  <FiPlusCircle className="w-5 h-5" /> Create New
                </button>
              </div>
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
                  placeholder="ID or name..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[10%]">ID</th>
            <th className="py-2 px-4 text-left w-[15%]">Name</th>
            <th className="py-2 px-4 text-left w-[30%]">Description</th>
            <th className="py-2 px-4 text-left w-[15%]">Price</th>
            <th className="py-2 px-4 text-left w-[10%]">Status</th>
            <th className="py-2 px-4 text-center w-[20%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            products.map((product) => (
              <Row 
                key={product.id} 
                product={product} 
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
