import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="w-full h-[280px] md:h-[340px] rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col" onClick={handleReadMore}>
      {blog?.image_url && (
        <div className="w-full h-36 md:h-48 overflow-hidden group flex-shrink-0">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      <div className="p-3 md:p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-medium text-base md:text-lg mb-2 line-clamp-2">
          {blog?.title}
        </h3>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs md:text-sm text-gray-500">
            Ngày {blog?.created_time ? formatDate(blog.created_time) : ''}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }} 
            className="flex items-center gap-1 md:gap-2 text-[#55d5d2] text-sm md:text-base transition-colors"
          >
            <span>ĐỌC TIẾP</span>
            <FaArrowRight className="w-2 h-2 md:w-3 md:h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;