import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateProductVariants from "./CreateProductVariants";
import EditProductVariants from './EditProductVariants';
import PropTypes from 'prop-types';

const Table = ({ variants, isLoading, error, onSearch, searchTerm, onUpdate, productId }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

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

  const handleEdit = (variant) => {
    setEditingVariant(variant);
  };

  if (editingVariant) {
    return <EditProductVariants 
      variant={editingVariant} 
      onClose={() => setEditingVariant(null)} 
      onUpdate={onUpdate}
    />;
  }

  if (showCreateForm) {
    return <CreateProductVariants 
      onClose={() => setShowCreateForm(false)} 
      onUpdate={onUpdate}
      productId={productId} // Truyền productId từ props
    />;
  }

  return (
    <div className="bg-white p-6 rounded-md">
      {error && (
        <div className="text-amber-600 mb-4 p-2 bg-amber-50 rounded">
          {error}
        </div>
      )}
      <div className="max-h-[500px] overflow-y-auto custom-scrollbar"> {/* Add wrapper div */}
        <table className="min-w-full bg-white mb-4">
          <thead className="sticky top-0 bg-white z-10"> {/* Make header sticky */}
            <tr className="border-b border-[rgba(167,174,174,1)]">
              <th colSpan="6" className="py-2 px-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold">All Variants</h1>
                  <button 
                    onClick={handleShowCreate}
                    className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2 ml-auto"
                  >
                    <FiPlusCircle className="w-5 h-5" /> Create New
                  </button>
                </div>
              </th>
            </tr>
            <tr className="border-b border-[rgba(167,174,174,1)]">
              <th colSpan="6" className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">Search </label>
                  <input
                    id="searchId"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyPress={handleKeyPress}
                    className="border rounded-[10px] px-2 py-1 w-48 font-normal"
                    placeholder="ID or color..."
                  />
                </div>
              </th>
            </tr>
            <tr className="bg-[rgba(217,217,217,0.5)]">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Branch ID</th>
              <th className="py-2 px-4 text-left">Color</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Loading...</td>
              </tr>
            ) : variants.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No variants found</td>
              </tr>
            ) : (
              variants.map((variant) => (
                <Row 
                  key={variant.id} 
                  variant={variant} 
                  onEdit={handleEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  variants: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired
};

export default Table;
