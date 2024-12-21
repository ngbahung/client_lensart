import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import { getWishlists, deleteWishlist, clearWishlist } from '../../../api/wishlistAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function FavoritesTable() {
  const navigate = useNavigate();
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
      // Ensure data is an array, if not, use empty array
      setFavorites(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Fetch favorites error:', error);
      setFavorites([]); // Set empty array on error
      setError('Không thể tải danh sách yêu thích');
      toast.error('Có lỗi xảy ra khi tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (wishlistDetailId) => {
    try {
      const result = await Swal.fire({
        title: 'Xác nhận xóa?',
        text: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        const response = await deleteWishlist(wishlistDetailId);
        if (response.success) {
          setFavorites(favorites.filter(item => item.wishlist_detail_id !== wishlistDetailId));
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Sản phẩm đã được xóa khỏi danh sách yêu thích.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
      }
    } catch (error) {
      toast.error('Không thể xóa sản phẩm khỏi danh sách yêu thích');
    }
  };

  const handleClearWishlists = async () => {
    try {
      const result = await Swal.fire({
        title: 'Xóa tất cả?',
        text: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách yêu thích?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa tất cả',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        const response = await clearWishlist();
        if (response.success) {
          setFavorites([]);
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Tất cả sản phẩm đã được xóa khỏi danh sách yêu thích.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
      }
    } catch (error) {
      toast.error('Không thể xóa danh sách yêu thích');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/gong-kinh/${productId}`);
  };

  const MobileProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border">
      <div className="flex items-center space-x-4">
        <div 
          className="flex-1 flex items-center space-x-4 cursor-pointer"
          onClick={() => handleProductClick(product.product_id)}
        >
          <img
            src={product.product_image || 'https://via.placeholder.com/100?text=No+Image'}
            alt={product.product_name}
            className="w-20 h-20 object-cover rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/100?text=No+Image';
            }}
          />
          <div className="flex-1">
            <h3 className="font-medium hover:text-blue-600 transition-colors">
              {product.product_name}
            </h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-blue-600 font-medium mt-1">
              {formatPrice(product.product_price)}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleRemoveFavorite(product.wishlist_detail_id)}
          className="text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sản phẩm yêu thích</h2>
        {favorites.length > 0 && (
          <button
            onClick={handleClearWishlists}
            className="text-red-600 hover:text-red-900 font-medium hover:bg-red-50 px-4 py-2 rounded-md transition-colors"
          >
            Xóa tất cả
          </button>
        )}
      </div>
      
      {/* Mobile view */}
      <div className="lg:hidden">
        {favorites.map(product => (
          <MobileProductCard key={product.wishlist_detail_id} product={product} />
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
              <tr key={product.wishlist_detail_id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleProductClick(product.product_id)}
                  >
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        src={product.product_image || 'https://via.placeholder.com/100?text=No+Image'}
                        alt={product.product_name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {product.product_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{formatPrice(product.product_price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{product.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleRemoveFavorite(product.wishlist_detail_id)}
                    className="text-red-600 hover:text-red-900 font-medium hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
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
