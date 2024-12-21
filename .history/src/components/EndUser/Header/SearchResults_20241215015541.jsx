import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';

const SearchResults = ({ results, onClose }) => {
  if (!results.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg max-h-96 overflow-y-auto z-50">
      {results.map(product => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          onClick={onClose}
          className="flex items-center p-3 hover:bg-gray-50 border-b"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-sm text-teal-600">{formatPrice(product.currentPrice)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;