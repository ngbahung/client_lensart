import React from 'react';
import { FaArrowRight, FaClock, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    // Remove HTML tags if present
    const plainText = text.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, maxLength) + '...';
  };

  return (
    <div 
      className="group w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col border border-gray-100"
      onClick={handleReadMore}
    >
      {/* Image Section */}
      {blog?.image_url && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden flex-shrink-0">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-[#55d5d2] text-white text-xs font-bold rounded-full shadow-lg">
              Blog
            </span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
        {/* Title */}
        <div className="mb-4">
          <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 text-gray-800 group-hover:text-[#55d5d2] transition-colors duration-300">
            {blog?.title}
          </h3>
          
          {/* Description */}
          {blog?.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {truncateText(blog.description, 120)}
            </p>
          )}
        </div>

        {/* Meta Info & CTA */}
        <div className="space-y-3 mt-auto">
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaClock className="text-[#55d5d2]" />
              <span>{blog?.created_time ? formatDate(blog.created_time) : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-[#55d5d2]" />
              <span>Đọc ngay</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Read More Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }} 
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#55d5d2] to-[#3fb8b5] text-white rounded-lg font-semibold text-sm transition-all duration-300 transform group-hover:shadow-lg"
          >
            <span>ĐỌC TIẾP</span>
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#55d5d2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default BlogCard;
