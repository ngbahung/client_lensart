import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import { transformProduct } from '../../../api/productsAPI';

const SearchResultItem = ({ product, onClose }) => {
  const transformedProduct = transformProduct(product);
  console.log(transformedProduct);
  
  return (
    <Link
      to={`/gong-kinh/${transformedProduct.id}`}
      onClick={onClose}
      className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors"
    >
      <div className="relative">
        <img 
          src={transformedProduct.image}
          alt={transformedProduct.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        {transformedProduct.discount && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {transformedProduct.discount}
          </span>
        )}
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
          {transformedProduct.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-teal-600">
            {formatPrice(transformedProduct.currentPrice)}
          </span>
          {transformedProduct.originalPrice > transformedProduct.currentPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(transformedProduct.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const SearchResults = ({ results, onClose, isSearching, containerRef }) => {
  if (!results?.length && !isSearching) return null;

  return (
    <div 
      ref={containerRef}  // Add this ref
      className="fixed md:absolute left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 top-16 md:top-full 
      w-[calc(100%-3rem)] md:w-[486px] mx-auto md:mx-0 bg-white shadow-lg rounded-lg overflow-hidden z-50 md:mt-2"
    >
      <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
          </div>
        ) : results?.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {results.map(product => (
              <SearchResultItem 
                key={product.id} 
                product={product} 
                onClose={onClose}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;