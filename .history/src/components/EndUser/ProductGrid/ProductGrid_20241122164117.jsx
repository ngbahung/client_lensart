// components/ProductGrid.jsx
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductQuickView from '../ProductQuickView/ProductQuickView';

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
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    const handleQuickView = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setQuickViewProduct({
                ...product,
                images: product.images || [product.image], // Fallback if images array not provided
            });
            <div className="flex justify-end mb-4 px-2 sm:px-0">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="best-selling">Bán chạy nhất</option>
                </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        {...product}
                        onBuyClick={onBuyClick}
                        onProductClick={onProductClick}
                        onQuickView={handleQuickView}
                    />
                ))}
            </div>
            
            <ProductQuickView 
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={(id, quantity) => {
                    // Handle add to cart
                    console.log('Add to cart:', id, quantity);
                }}
                onBuyNow={(id, quantity) => {
                    onBuyClick(id);
                    setQuickViewProduct(null);
                }}
            />

            {totalPages > 1 && (
                <div className="flex justify-center gap-1 sm:gap-2 mt-6 mb-8">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => onPageChange(index + 1)}
                            className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg ${
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
                        className="px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
