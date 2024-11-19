import React, { useState } from 'react';
import ProductCard from '../../components/EndUser/ProductCard/ProductCard';
import FilterDropdown from '../../components/EndUser/Filter/FilterDropdown';

const FramesPage = () => {
  const [filters, setFilters] = useState({
    frameStyles: [],
    brands: [],
    priceRange: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mock data - replace with API call
  const products = [
    // ... your product data
  ];

  const filterOptions = {
    frameStyles: ["Đa giác", "Vuông", "Chữ nhật", "Browline", "Oval", "Phi công"],
    brands: ["Ray-Ban", "Oakley", "Gucci", "Prada"],
    priceRange: ["Dưới 1tr", "1tr - 2tr", "2tr - 5tr", "Trên 5tr"],
  };

  const handleFilterChange = (filterType, selectedOptions) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: selectedOptions
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <FilterDropdown
            title="Kiểu gọng"
            options={filterOptions.frameStyles}
            onFilterChange={(selected) => handleFilterChange('frameStyles', selected)}
          />
          <FilterDropdown
            title="Thương hiệu"
            options={filterOptions.brands}
            onFilterChange={(selected) => handleFilterChange('brands', selected)}
          />
          <FilterDropdown
            title="Giá"
            options={filterOptions.priceRange}
            onFilterChange={(selected) => handleFilterChange('priceRange', selected)}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            ).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onBuyClick={() => {/* Handle buy click */}}
                onProductClick={() => {/* Handle product click */}}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FramesPage;
