import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Row from "./Row";
import CreateBlog from "./CreateBlog";
import EditBlog from './EditBlog';

const Table = ({ blogs, isLoading, error, onStatusChange, onSearch, searchTerm, onDelete, onUpdateSuccess }) => { // Remove refreshBlogs
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

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

  const handleEdit = (blog) => {
    console.log("Editing blog:", blog); // Add this debug line
    setEditingBlog(blog);
  };

  const handleEditSuccess = async () => {
    try {
      if (typeof onEditSuccess === 'function') {
        await onEditSuccess();
      }
      setEditingBlog(null); // Reset form editing state
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  if (editingBlog) {
    return <EditBlog
      blog={editingBlog}
      onClose={() => setEditingBlog(null)}
      onEditSuccess={() => {
        setEditingBlog(null);
        onUpdateSuccess();
      }}
    />;
  }

  if (showCreateForm) {
    return <CreateBlog 
      onClose={() => setShowCreateForm(false)}
      onCreateSuccess={() => {
        setShowCreateForm(false);
        onUpdateSuccess();
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
            <th colspan="3" className="py-2 px-4 text-left">
              <h1 className="text-xl font-semibold">All Blogs</h1>
            </th>
            <th></th>
            <th colspan="2" className="py-2 px-4 text-right">
              <button
                onClick={handleShowCreate}
                className="px-4 py-2 bg-[rgba(85,213,210,1)] text-white rounded-[10px] hover:opacity-90 font-normal flex items-center gap-2 ml-auto"
              >
                <FiPlusCircle className="w-5 h-5" /> Create New
              </button>
            </th>
          </tr>
          <tr>
            <th colSpan="6" className="py-2 px-4">
              <div className="flex items-center gap-2 justify-start">
                <label htmlFor="searchId" className="font-medium text-[rgba(167,174,174,1)]">Search by ID/Title: </label>
                <input
                  id="searchId"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="border rounded-[10px] px-2 py-1 w-48 font-normal"
                  placeholder="Enter ID or title..."
                />
              </div>
            </th>
          </tr>
          <tr className="bg-[rgba(217,217,217,0.5)]">
            <th className="py-2 px-4 text-left w-[10%]">ID</th>
            <th className="py-2 px-4 text-left w-[15%]">Image</th>
            <th className="py-2 px-4 text-left w-[25%]">Title</th>
            <th className="py-2 px-4 text-left w-[30%]">Description</th>
            <th className="py-2 px-4 text-left w-[10%]">Status</th>
            <th className="py-2 px-4 text-center w-[10%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td> {/* Update colspan to 6 */}
            </tr>
          ) : (
            blogs.map((blog) => (
              <Row 
                key={blog.id} 
                blog={blog} 
                onStatusChange={onStatusChange}
                onEdit={handleEdit}
                onDelete={onDelete} // Pass onDelete prop
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
