// components/ProductGrid.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ 
    products, 
    currentPage, 
    totalPages, 
    onPageChange, 
    onBuyClick, 
    onProductClick,
    sortBy,
    onSortChange
}) => {
    return (
        <div>
            <div className="flex justify-end mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="best-selling">Bán chạy nhất</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        {...product}
                        onBuyClick={() => onBuyClick(product.id)}
                        onProductClick={() => onProductClick(product.id)}
                    />
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8 mb-8">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => onPageChange(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === index + 1 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-gray-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
