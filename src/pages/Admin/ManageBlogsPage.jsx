import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Admin/Manage_Blogs/Table';
import Pagination from "../../components/Admin/Manage_Blogs/Pagination";

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const ITEMS_PER_PAGE = 6; // Số lượng items mỗi trang
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

  const refreshBlogs = async () => {
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blogs');
        if (response.data) {
          const allBlogs = response.data.data || mockData;
          setBlogs(allBlogs);
          // Tính tổng số trang dựa trên số lượng items
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

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán items cho trang hiện tại từ danh sách đã được lọc
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
      // Find current blog and get its current status
      const currentBlog = blogs.find(blog => blog.id === blogId);
      const newStatus = !currentBlog.status;
      
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
        const response = await axios.post(`http://127.0.0.1:8000/api/blogs/delete/${blogId}`);
        if (response.status === 200) {
          setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
          alert('Blog deleted successfully');
          refreshBlogs(); // Refresh the list after deletion
        }
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete blog");
        console.error("Failed to delete blog:", error);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search
    // Cập nhật tổng số trang dựa trên kết quả tìm kiếm
    const filtered = blogs.filter(blog => 
      blog.id.toString().toLowerCase().includes(value.toLowerCase()) ||
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  return (
    <div className="bg-white p-6 rounded-md flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          <Table 
            blogs={getCurrentPageItems()}
            isLoading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            refreshBlogs={refreshBlogs}
            onDelete={handleDelete} // Add this prop
          />
        </div>
      </div>
      {!isLoading && filteredBlogs.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ManageBlogsPage;