import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Admin/Manage_Blogs/Table';
import Pagination from "../../components/Admin/Manage_Blogs/Pagination";
import { FaBlog, FaEye, FaEyeSlash, FaChartLine } from 'react-icons/fa';

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 6;
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    {
      id: 1,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Top 10 Eyewear Trends 2024",
      description: "Discover the latest eyewear trends that will dominate the fashion scene in 2024...",
      status: "active"
    },
    {
      id: 2,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "How to Choose the Perfect Frames",
      description: "A comprehensive guide to selecting frames that complement your face shape and style...",
      status: "inactive"
    },
    {
      id: 3,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Caring for Your Glasses",
      description: "Essential tips and tricks for maintaining your eyewear in perfect condition...",
      status: "active"
    },
    {
      id: 4,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Understanding Lens Types",
      description: "Everything you need to know about different types of lenses and their benefits...",
      status: "inactive"
    },
    {
      id: 5,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Fashion and Function in Eyewear",
      description: "How modern eyewear combines style with practical functionality...",
      status: "active"
    },
    {
      id: 6,
      image_url: "https://tronhouse.com/assets/data/editor/source/meo-chup-hinh-anh-mat-kinh-thoi-trang-doc-dao-hap-dan-khach-hang/chup-anh-mat-kinh-5.jpg",
      title: "Children's Eye Health",
      description: "Important information about maintaining good eye health in children...",
      status: "inactive"
    }
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/blogs');
      if (response.data) {
        const allBlogs = response.data.data || mockData;
        setBlogs(allBlogs);
        setTotalPages(Math.ceil(allBlogs.length / ITEMS_PER_PAGE));
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs(mockData);
      setTotalPages(Math.ceil(mockData.length / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBlogs.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (blogId) => {
    try {
      const currentBlog = blogs.find(blog => blog.id === blogId);
      const newStatus = currentBlog.status === 'inactive' ? 'active' : 'inactive';
      
      const response = await axios.post(`http://localhost:8000/api/blogs/switch-status/${blogId}`);
      
      if (response.status === 200) {
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog.id === blogId ? {...blog, status: newStatus} : blog
          )
        );
      }
    } catch (error) {
      alert("Failed to update blog status");
      console.error("Failed to update blog status:", error);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await axios.post(`http://localhost:8000/api/blogs/delete/${blogId}`);
        if (response.status === 200) {
          setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
          alert('Blog deleted successfully');
        }
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete blog");
        console.error("Failed to delete blog:", error);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = blogs.filter(blog => 
      blog.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  const handleUpdateSuccess = () => {
    fetchBlogs();
  };

  // Calculate statistics
  const activeBlogs = blogs.filter(blog => blog.status === 'active').length;
  const inactiveBlogs = blogs.filter(blog => blog.status === 'inactive').length;

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Management</h1>
        <p className="text-gray-600">Manage your blog posts and content</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#55d5d2] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Blogs</p>
              <p className="text-3xl font-bold text-gray-800">{blogs.length}</p>
            </div>
            <div className="bg-[#55d5d2]/10 p-3 rounded-lg">
              <FaBlog className="text-[#55d5d2] text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-800">{activeBlogs}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaEye className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Inactive</p>
              <p className="text-3xl font-bold text-gray-800">{inactiveBlogs}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FaEyeSlash className="text-orange-500 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Publish Rate</p>
              <p className="text-3xl font-bold text-gray-800">
                {blogs.length > 0 ? Math.round((activeBlogs / blogs.length) * 100) : 0}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaChartLine className="text-purple-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex-grow">
          <Table 
            blogs={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onDelete={handleDelete}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>

        {/* Pagination */}
        {!isLoading && filteredBlogs.length > 0 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to{' '}
              <span className="font-semibold">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredBlogs.length)}
              </span>{' '}
              of <span className="font-semibold">{filteredBlogs.length}</span> blogs
            </p>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogsPage;
