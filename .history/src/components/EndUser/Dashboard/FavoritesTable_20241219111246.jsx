import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { getWishlists, deleteWishlist } from '../../../api/wishlistAPI';
import { toast } from 'react-toastify';

function FavoritesTable() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getWishlists();
      setFavorites(data);
      setError(null);
    } catch (error) {
      setError('Không thể tải danh sách yêu thích');
      toast.error('Có lỗi xảy ra khi tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      const response = await deleteWishlist(productId);
      if (response.success) {
        setFavorites(favorites.filter(item => item.product_id !== productId));
        toast.success(response.message || 'Đã xóa khỏi danh sách yêu thích');
      }
    } catch (error) {
      toast.error('Không thể xóa sản phẩm khỏi danh sách yêu thích');
    }
  };

  const MobileProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border">
      <div className="flex items-center space-x-4">
        <img
          src={product.image_url || 'https://via.placeholder.com/100?text=No+Image'}
          alt={product.product_name}
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
          }}
        />
        <div className="flex-1">
          <h3 className="font-medium">{product.product_name}</h3>
          <p className="text-gray-500 text-sm">{product.category_name}</p>
          <p className="text-blue-600 font-medium mt-1">
            {formatPrice(product.product_price)}
          </p>
        </div>
        <button
          onClick={() => handleRemoveFavorite(product.product_id)}
          className="text-red-600 p-2"
        >
          Xóa
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
        <div className="text-center py-8 text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
        <div className="text-center py-8 text-gray-500">
          Bạn chưa có sản phẩm yêu thích nào
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sản phẩm yêu thích</h2>
      
      {/* Mobile view */}
      <div className="lg:hidden">
        {favorites.map(product => (
          <MobileProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block overflow-x-auto">
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
            {favorites.map((product) => (
              <tr key={product.product_id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        src={product.image_url || 'https://via.placeholder.com/100?text=No+Image'}
                        alt={product.product_name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.product_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{formatPrice(product.product_price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{product.category_name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleRemoveFavorite(product.product_id)}
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
