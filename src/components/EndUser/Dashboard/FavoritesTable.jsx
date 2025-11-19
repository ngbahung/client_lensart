import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import { getWishlists, deleteWishlist, clearWishlist, moveProductToCart, moveAllToCart } from '../../../api/wishlistAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../contexts/CartContext';

function FavoritesTable() {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
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
            title: 'Thành công!',
            text: response.message || 'Đã xóa tất cả sản phẩm khỏi danh sách yêu thích',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
          });
        } else {
          throw new Error(response.message || 'Không thể xóa danh sách yêu thích');
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: error.message || 'Không thể xóa danh sách yêu thích',
        icon: 'error',
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    }
  };

  const handleMoveToCart = async (wishlistDetailId) => {
    try {
      const response = await moveProductToCart(wishlistDetailId);
      
      // Remove item from favorites list immediately
      setFavorites(prevFavorites => 
        prevFavorites.filter(item => item.wishlist_detail_id !== wishlistDetailId)
      );
      
      // Refresh cart to update cart count
      await refreshCart();
      
      // Show success notification
      Swal.fire({
        title: 'Thành công!',
        text: response.message || 'Đã thêm sản phẩm vào giỏ hàng',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } catch (error) {
      console.error('Move to cart error:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: error.message || 'Không thể thêm vào giỏ hàng',
        icon: 'error',
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    }
  };

  const handleMoveAllToCart = async () => {
    try {
      const result = await Swal.fire({
        title: 'Thêm tất cả vào giỏ hàng?',
        text: 'Bạn có muốn thêm tất cả sản phẩm vào giỏ hàng?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Thêm tất cả',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        const response = await moveAllToCart();
        
        // Clear favorites list immediately
        setFavorites([]);
        
        // Refresh cart to update cart count
        await refreshCart();
        
        // Show success notification
        Swal.fire({
          title: 'Thành công!',
          text: response.message || 'Đã thêm tất cả sản phẩm vào giỏ hàng',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-end',
          toast: true
        });
      }
    } catch (error) {
      console.error('Move all to cart error:', error);
      // Reload favorites to get correct state if there was an error
      await fetchFavorites();
      Swal.fire({
        title: 'Lỗi!',
        text: error.message || 'Không thể thêm sản phẩm vào giỏ hàng',
        icon: 'error',
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/gong-kinh/${productId}`);
  };

  const MobileProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:border-[#6fd4d2] hover:shadow-lg transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div 
          className="flex-1 flex items-center space-x-4 cursor-pointer group"
          onClick={() => handleProductClick(product.product_id)}
        >
          <div className="relative">
            <img
              src={product.product_image || 'https://via.placeholder.com/100?text=No+Image'}
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100 group-hover:border-[#6fd4d2] transition-all duration-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100?text=No+Image';
              }}
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-full p-1.5">
              <FiHeart className="w-3 h-3 text-white fill-current" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 group-hover:text-[#6fd4d2] transition-colors line-clamp-2">
              {product.product_name}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{product.category}</p>
            <p className="text-[#6fd4d2] font-bold mt-1.5">
              {formatPrice(product.product_price)}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleMoveToCart(product.wishlist_detail_id)}
            className="p-2.5 bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white hover:from-[#55d5d2] hover:to-[#6fd4d2] rounded-lg transition-all duration-200 shadow-md"
            title="Thêm vào giỏ"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleRemoveFavorite(product.wishlist_detail_id)}
            className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
            title="Xóa"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6fd4d2] border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300">
        <div className="flex items-center space-x-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
          <div className="p-3 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-xl shadow-md">
            <FiHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sản phẩm yêu thích</h2>
            <p className="text-sm text-gray-500 mt-1">Chưa có sản phẩm yêu thích</p>
          </div>
        </div>
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#eff9f9] to-white rounded-full flex items-center justify-center">
            <FiHeart className="w-12 h-12 text-[#6fd4d2]" />
          </div>
          <p className="text-gray-500 text-lg mb-2">Bạn chưa có sản phẩm yêu thích nào</p>
          <p className="text-gray-400 text-sm">Thêm sản phẩm vào danh sách yêu thích để xem sau</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-xl shadow-md">
            <FiHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sản phẩm yêu thích</h2>
            <p className="text-sm text-gray-500 mt-1">Tổng {favorites.length} sản phẩm</p>
          </div>
        </div>
        {favorites.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={handleMoveAllToCart}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white hover:from-[#55d5d2] hover:to-[#6fd4d2] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiShoppingCart className="w-4 h-4" />
              <span>Thêm tất cả</span>
            </button>
            <button
              onClick={handleClearWishlists}
              className="flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Xóa tất cả</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile view */}
      <div className="lg:hidden">
        {favorites.map(product => (
          <MobileProductCard key={product.wishlist_detail_id} product={product} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#eff9f9] to-white border-b-2 border-[#6fd4d2]/20">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Thông tin sản phẩm
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Đơn giá
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Phân loại
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((product) => (
              <tr key={product.wishlist_detail_id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#eff9f9] hover:to-white transition-all duration-200 group">
                <td className="px-6 py-4">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleProductClick(product.product_id)}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={product.product_image || 'https://via.placeholder.com/100?text=No+Image'}
                        alt={product.product_name}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100 group-hover:border-[#6fd4d2] transition-all duration-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-full p-1.5">
                        <FiHeart className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#6fd4d2] transition-colors">
                        {product.product_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-[#6fd4d2]">{formatPrice(product.product_price)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">{product.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMoveToCart(product.wishlist_detail_id)}
                      className="flex items-center space-x-1 bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white hover:from-[#55d5d2] hover:to-[#6fd4d2] font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span>Thêm vào giỏ</span>
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(product.wishlist_detail_id)}
                      className="flex items-center space-x-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Xóa</span>
                    </button>
                  </div>
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
