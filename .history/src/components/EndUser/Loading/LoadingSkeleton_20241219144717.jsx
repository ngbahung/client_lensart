import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>

      {/* Banner skeleton */}
      <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-8"></div>

      {/* Filter buttons skeleton */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
