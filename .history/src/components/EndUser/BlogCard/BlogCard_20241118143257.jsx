import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { HiOutlineGlasses } from 'react-icons/hi';

const BlogCard = ({ blog }) => {
  const handleClick = () => {
    console.log('Card clicked');
    // Add your click handling logic here
  };

  return (
    <div 
      className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {/* Add image section */}
      {blog?.image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex p-4 gap-4">
        {/* Left side - Yellow box with glasses icon */}
        <div className="w-1/2 bg-amber-300 rounded-lg p-4 flex flex-col justify-center items-center">
          <HiOutlineGlasses className="text-4xl mb-2" />
          <div className="text-lg font-medium text-center">GỌNG CÁNH BƯỚM</div>
        </div>

        {/* Right side - Face illustrations */}
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="text-gray-600 text-sm">MẶT TRÁI XOAN</div>
            <div className="flex gap-2">
              <div className="w-12 h-12 border rounded-full"></div>
              <div className="w-12 h-12 border rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-gray-600 text-sm">MẶT TRÒN</div>
            <div className="flex gap-2">
              <div className="w-12 h-12 border rounded-full"></div>
              <div className="w-12 h-12 border rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-4 pb-4">
        <h3 className="font-medium text-lg mb-2">
          {blog?.title || 'Gọng kính hình bướm - Phong cách gọng kính độc đáo!'}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Blog</span>
            <span>|</span>
            <span>Ngày {blog?.postedDate || '26/10/2024'}</span>
          </div>
          <button 
            className="flex items-center gap-1 text-blue-400 hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Read more clicked');
            }}
          >
            ĐỌC TIẾP
            <HiOutlineArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;