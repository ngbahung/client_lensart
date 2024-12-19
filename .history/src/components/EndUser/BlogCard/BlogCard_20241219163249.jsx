// Import thư viện React và icon mũi tên từ react-icons
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Component BlogCard nhận vào một prop là blog chứa thông tin bài viết
const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    // Container chính của card với hiệu ứng hover và shadow
    <div className="max-w-sm h-[400px] rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl flex flex-col">
      {/* Phần hiển thị hình ảnh blog với hiệu ứng zoom khi hover */}
      {blog?.image_url && (
        <div className="w-full h-48 overflow-hidden group">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      {/* Phần nội dung của card chứa tiêu đề và thông tin */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Tiêu đề bài viết với fallback text nếu không có title */}
        <h3 className="font-medium text-base md:text-lg mb-2 flex-grow">
          {blog?.title}
        </h3>
        {/* Footer của card chứa ngày đăng và nút đọc tiếp */}
        <div className="flex justify-between items-center">
          {/* Hiển thị ngày đăng bài với fallback date */}
          <div className="text-xs md:text-sm text-gray-500">
            Ngày {blog?.created_time ? formatDate(blog.created_time) : ''}
          </div>
          {/* Nút đọc tiếp với icon mũi tên */}
          <button className="flex items-center gap-1 md:gap-2 text-[#55d5d2] text-sm md:text-base transition-colors">
            <span>ĐỌC TIẾP</span>
            <FaArrowRight className="w-2 h-2 md:w-3 md:h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;