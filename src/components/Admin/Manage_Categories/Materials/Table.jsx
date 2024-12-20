import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateMaterial from "./CreateMaterial";
import EditMaterial from './EditMaterial';

const Table = ({ materials, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

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

  const handleEdit = (material) => {
    setEditingMaterial(material);
  };

  if (editingMaterial) {
    return <EditMaterial 
      material={editingMaterial} 
      onClose={() => setEditingMaterial(null)} 
      onUpdate={onUpdate}  // Add onUpdate prop
    />;
  }

  if (showCreateForm) {
    return <CreateMaterial 
      onClose={() => setShowCreateForm(false)} 
      onUpdate={onUpdate}  // Add onUpdate prop
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
            <th colspan="3" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Materials</h1>
            </th>
            <th colSpan="1" className="py-2 px-4 text-right place-items-center"> 
              <button 
                onClick={handleShowCreate}
                className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2 mr-0"
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
            materials.map((material) => (
              <Row 
                key={material.id} 
                material={material} 
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

Table.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['active', 'inactive']).isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired, // Add this prop type
};

export default Table;
