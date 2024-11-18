import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      {blog?.image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">
          {blog?.title || 'Gọng kính hình bướm - Phong cách gọng kính độc đáo!'}
        </h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Ngày {blog?.postedDate || '26/10/2024'}
          </div>
          <button className="flex items-center gap-2 text-[#55d5d2] transition-colors">
            <span>ĐỌC TIẾP</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;