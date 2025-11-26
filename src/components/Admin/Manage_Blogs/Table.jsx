import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Row from "./Row";
import CreateBlog from "./CreateBlog";
import EditBlog from './EditBlog';

const Table = ({ blogs, isLoading, error, onStatusChange, onSearch, searchTerm, onDelete, onUpdateSuccess }) => {
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
    console.log("Editing blog:", blog);
    setEditingBlog(blog);
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
    <div className="bg-white">
      {error && (
        <div className="mx-6 mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Blogs</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and organize your blog posts</p>
          </div>
          <button
            onClick={handleShowCreate}
            className="px-6 py-3 bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white rounded-lg hover:shadow-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <FiPlusCircle className="w-5 h-5" />
            <span>Create New Blog</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              className="block w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55d5d2] focus:border-transparent transition-all"
              placeholder="Search by ID or title..."
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[10%]">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[15%]">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[25%]">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[30%]">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[10%]">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-[#55d5d2] border-t-transparent animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading blogs...</p>
                  </div>
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl font-semibold text-gray-700 mb-2">No blogs found</p>
                    <p className="text-gray-500 mb-6">
                      {searchTerm ? 'Try adjusting your search terms' : 'Create your first blog to get started'}
                    </p>
                    {!searchTerm && (
                      <button
                        onClick={handleShowCreate}
                        className="px-6 py-3 bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white rounded-lg hover:shadow-lg font-semibold flex items-center gap-2 transition-all"
                      >
                        <FiPlusCircle className="w-5 h-5" />
                        <span>Create First Blog</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <Row 
                  key={blog.id} 
                  blog={blog} 
                  onStatusChange={onStatusChange}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
