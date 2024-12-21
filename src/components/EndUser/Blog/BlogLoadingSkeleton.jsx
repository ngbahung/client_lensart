import React from 'react';

const BlogLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-200"></div>
          
          {/* Content placeholders */}
          <div className="p-4">
            {/* Date placeholder */}
            <div className="w-24 h-4 bg-gray-200 rounded mb-3"></div>
            
            {/* Title placeholder */}
            <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
            
            {/* Description placeholder */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogLoadingSkeleton;
