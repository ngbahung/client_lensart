import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateManager from "./CreateManager";
import EditManager from './EditManager';

const Table = ({ Managers, isLoading, error, onStatusChange, onSearch, searchTerm, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingManager, setEditingManager] = useState(null);

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

  const handleEdit = (Manager) => {
    setEditingManager(Manager);
  };

  const handleCreateSuccess = async () => {
    await onUpdate(); // Gọi fetchManagers để cập nhật danh sách
    setShowCreateForm(false); // Đóng form sau khi cập nhật thành công
  };

  const handleEditSuccess = async () => {
    await onUpdate(); // Gọi fetchManagers để cập nhật danh sách
    setEditingManager(null); // Đóng form sau khi cập nhật thành công
  };

  if (editingManager) {
    return <EditManager 
      Manager={editingManager} 
      onClose={() => setEditingManager(null)} 
      onUpdate={handleEditSuccess}
    />;
  }

  if (showCreateForm) {
    return <CreateManager 
      onClose={() => setShowCreateForm(false)} // Xử lý đóng trực tiếp
      onUpdate={handleCreateSuccess} // Truyền handler mới
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
            <th colSpan="4" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Managers</h1>
            </th>
            <th colSpan="2" className="py-2 px-4 text-right"> 
              <button 
                onClick={handleShowCreate}
                className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2 float-right"
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
            <th className="py-2 px-4 text-left w-[10%]">ID</th>
            <th className="py-2 px-4 text-left w-[25%]">Full Name</th>
            <th className="py-2 px-4 text-left w-[25%]">Email</th>
            <th className="py-2 px-4 text-left w-[15%]">Phone Number</th>
            <th className="py-2 px-4 text-left w-[15%]">Status</th>
            <th className="py-2 px-4 text-center w-[10%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            Managers.map((Manager) => (
              <Row 
                key={Manager.id} 
                Manager={Manager} 
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
