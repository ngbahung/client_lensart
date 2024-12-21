import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Image gallery skeleton */}
        <div className="space-y-6">
          <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>

          {/* Branch info skeleton */}
          <div className="border rounded-lg p-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Policy section skeleton */}
      <div className="mt-8">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Reviews section skeleton */}
      <div className="mt-8 border-t pt-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
