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
    {
      id: 1,
      name: "Ray-Ban Wayfarer Classic",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
      currentPrice: 1890000,
      originalPrice: 2190000,
      discount: "-14%",
    },
    {
      id: 2,
      name: "Gucci Square Acetate",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666",
      currentPrice: 5490000,
      originalPrice: 6990000,
      discount: "-21%",
    },
    {
      id: 3,
      name: "Oakley Holbrook",
      image: "https://images.unsplash.com/photo-1615476927859-607b6e6e1159",
      currentPrice: 2490000,
    },
    {
      id: 4,
      name: "Prada Linea Rossa",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371",
      currentPrice: 4990000,
      originalPrice: 5490000,
      discount: "-9%",
    },
    {
      id: 5,
      name: "Ray-Ban Aviator Classic",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      currentPrice: 1990000,
      originalPrice: 2490000,
      discount: "-20%",
    },
    {
      id: 6,
      name: "Gucci Rectangular Metal",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4",
      currentPrice: 6990000,
    },
    {
      id: 7,
      name: "Oakley Half Jacket",
      image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0",
      currentPrice: 2990000,
      originalPrice: 3490000,
      discount: "-14%",
    },
    {
      id: 8,
      name: "Prada Geometric",
      image: "https://images.unsplash.com/photo-1572635196184-84e35138cf62",
      currentPrice: 5490000,
      originalPrice: 6990000,
      discount: "-21%",
    },
    {
      id: 9,
      name: "Ray-Ban Round Metal",
      image: "https://images.unsplash.com/photo-1513670555095-a0120c1a2fb3",
      currentPrice: 1690000,
    },
    {
      id: 10,
      name: "Gucci Pilot",
      image: "https://images.unsplash.com/photo-1514063364521-a61e5bcf4526",
      currentPrice: 7490000,
      originalPrice: 8990000,
      discount: "-17%",
    },
    {
      id: 11,
      name: "Oakley Radar EV",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      currentPrice: 3290000,
    },
    {
      id: 12,
      name: "Prada Conceptual",
      image: "https://images.unsplash.com/photo-1559070169-a3077159ee16",
      currentPrice: 4990000,
      originalPrice: 5990000,
      discount: "-17%",
    },
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Filter Section */}
      <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <FilterDropdown
          title="Kiểu gọng"
          options={filterOptions.frameStyles}
          onFilterChange={(selected) => handleFilterChange('frameStyles', selected)}
          className="w-full sm:w-auto"
        />
        <FilterDropdown
          title="Thương hiệu"
          options={filterOptions.brands}
          onFilterChange={(selected) => handleFilterChange('brands', selected)}
          className="w-full sm:w-auto"
        />
        <FilterDropdown
          title="Giá"
          options={filterOptions.priceRange}
          onFilterChange={(selected) => handleFilterChange('priceRange', selected)}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="mt-6 sm:mt-8 flex justify-center">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
                currentPage === i + 1
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FramesPage;
