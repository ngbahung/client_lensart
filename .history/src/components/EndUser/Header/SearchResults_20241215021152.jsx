import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import { transformProduct } from '../../../api/productsApi';

const SearchResultItem = ({ product, onClose }) => {
  const transformedProduct = transformProduct(product);
  
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

const SearchResults = ({ results, onClose }) => {
  if (!results?.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg max-h-[60vh] overflow-y-auto z-50 mt-2">
      <div className="p-2">
        {results.map(product => (
          <SearchResultItem 
            key={product.id} 
            product={product} 
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;