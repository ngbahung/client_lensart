import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateShape from "./CreateShape";
import EditShape from './EditShape';

const Table = ({ shapes, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingShape, setEditingShape] = useState(null);

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

  const handleEdit = (shape) => {
    setEditingShape(shape);
  };

  if (editingShape) {
    return <EditShape 
      shape={editingShape} 
      onClose={() => setEditingShape(null)} 
      onUpdate={onUpdate}
    />;
  }

  if (showCreateForm) {
    return <CreateShape 
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
            <th colspan="3" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Shapes</h1>
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
          ) : shapes && shapes.length > 0 ? (
            shapes.map((shape) => (
              <Row 
                key={shape.id} 
                shape={shape} 
                onStatusChange={onStatusChange}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No shapes found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  shapes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired, // Changed from bool to string
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Table;
