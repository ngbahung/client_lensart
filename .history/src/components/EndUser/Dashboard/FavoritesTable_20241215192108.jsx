import React from 'react';
import { formatPrice } from '../../../utils/formatPrice';

function FavoritesTable() {
  // Mock data - replace with actual API data later
  const mockFavorites = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      name: 'Sản phẩm mẫu 1',
      price: 250000,
      category: 'Áo thun',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      name: 'Sản phẩm mẫu 2',
      price: 450000,
      category: 'Quần jean',
    },
  ];

  const handleRemoveFavorite = (productId) => {
    console.log('Removing product from favorites:', productId);
    // TODO: Implement remove favorite API call
  };

  if (mockFavorites.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md ml-6 flex-1">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
        <div className="text-center py-8 text-gray-500">
          Bạn chưa có sản phẩm yêu thích nào
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ml-6 flex-1">
      <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
      <div className="overflow-x-auto relative">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thông tin sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đơn giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phân loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {mockFavorites.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{formatPrice(product.price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{product.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritesTable;
