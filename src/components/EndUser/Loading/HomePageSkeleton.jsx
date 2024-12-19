import React from 'react';

const HomePageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-[600px] bg-gray-200"></div>

      {/* Promotional Banner Skeleton */}
      <div className="hidden md:block my-8">
        <div className="w-full h-[200px] bg-gray-200 rounded-lg"></div>
      </div>

      {/* Product Sections Skeleton */}
      {[1, 2].map((section) => (
        <div key={section} className="container mx-auto px-4 md:px-8 my-8">
          <div className="h-8 bg-gray-200 w-48 mb-6 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logo Cloud Skeleton */}
      <div className="container mx-auto px-4 my-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((logo) => (
            <div key={logo} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Blog Section Skeleton */}
      <div className="container mx-auto px-4 md:px-8 my-8">
        <div className="h-8 bg-gray-200 w-48 mb-6 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((blog) => (
            <div key={blog} className="bg-white p-4 rounded-lg shadow">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
