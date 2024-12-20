import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateBranch from "./CreateBranch";
import EditBranch from './EditBranch';
import PropTypes from 'prop-types'; // Add PropTypes import

const Table = ({ 
  branches, 
  isLoading, 
  error, 
  onStatusChange, 
  onSearch, 
  searchTerm,
  onUpdate,
  onEdit
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

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

  const handleEdit = (branch) => {
    setEditingBranch(branch);
  };

  const handleEditSubmit = async (branchId, updatedData) => {
    const success = await onEdit(branchId, updatedData);
    if (success) {
      setEditingBranch(null);
      onUpdate();
    }
  };

  if (editingBranch) {
    return <EditBranch 
      branch={editingBranch} 
      onSubmit={handleEditSubmit}
      onClose={() => setEditingBranch(null)}
    />;
  }

  if (showCreateForm) {
    return <CreateBranch 
      onClose={() => {
        setShowCreateForm(false);
        onUpdate(); // Replace window.location.reload()
      }}
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
            <th colSpan="5" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Branches</h1>
            </th>
            <th colSpan="2" className="py-2 px-4"> 
              <div className="flex justify-end">
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
            <th className="py-2 px-4 text-left w-[10%]">ID</th>
            <th className="py-2 px-4 text-left w-[15%]">Name</th>
            <th className="py-2 px-4 text-left w-[25%]">Address</th>
            <th className="py-2 px-4 text-left w-[15%]">Manager Name</th>
            <th className="py-2 px-4 text-left w-[10%]">Index</th>
            <th className="py-2 px-4 text-left w-[10%]">Status</th>
            <th className="py-2 px-4 text-center w-[15%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">Loading...</td>
            </tr>
          ) : branches.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">No branches found</td>
            </tr>
          ) : (
            branches.map((branch) => (
              <Row 
                key={branch.id} 
                branch={branch} 
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
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      branch_name: PropTypes.string.isRequired,
      address: PropTypes.string,
      manager_name: PropTypes.string,
      index: PropTypes.number,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Table;
