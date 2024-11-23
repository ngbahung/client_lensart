import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      {blog?.image && (
        <div className="w-full h-36 md:h-48 overflow-hidden group">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      <div className="p-3 md:p-4">
        <h3 className="font-medium text-base md:text-lg mb-2">
          {blog?.title || 'Gọng kính hình bướm - Phong cách gọng kính độc đáo!'}
        </h3>
        <div className="flex justify-between items-center">
          <div className="text-xs md:text-sm text-gray-500">
            Ngày {blog?.postedDate || '26/10/2024'}
          </div>
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