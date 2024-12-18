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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ml-6 flex-1">
      <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFavorites.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="text-red-600 hover:text-red-900"
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