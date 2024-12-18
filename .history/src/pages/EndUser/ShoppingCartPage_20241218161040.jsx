import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';

const cartBreadcrumbItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giỏ hàng', path: '/gio-hang' }
];

const ShoppingCartPage = () => {
  const { items: cartItems, loading, error, refreshCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    document.title = 'Giỏ hàng | LensArt EyeWear';
    if (isAuthenticated) {
      refreshCart();
    }
  }, [refreshCart, isAuthenticated]);

  const handleContinueShopping = () => {
    window.history.back();
  };

  const handleUpdateCart = (updatedItems) => {
    updateCart(updatedItems);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thanh toán');
      navigate('/login', { state: { from: '/gio-hang' } });
      return;
    }
    navigate('/checkout');
  };

  const handleSelectItem = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    updateCart(updatedItems);
  };

  const handleSelectAll = (isSelected) => {
    const updatedItems = cartItems.map(item => ({ ...item, selected: isSelected }));
    updateCart(updatedItems);
  };



  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl p-2">
        <Breadcrumb items={cartBreadcrumbItems} />
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-2">
        <Breadcrumb items={cartBreadcrumbItems} />
        <div className="text-center py-16">
          <h2 className="text-xl text-red-500 mb-4">Có lỗi xảy ra khi tải giỏ hàng</h2>
          <button 
            className="bg-teal-500 text-white px-6 py-2 rounded-lg"
            onClick={refreshCart}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl p-2">
        <Breadcrumb items={cartBreadcrumbItems} />
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <button 
            className="bg-orange-500 text-white px-6 py-2 rounded-lg"
            onClick={handleContinueShopping}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
      <Breadcrumb items={cartBreadcrumbItems} />
      {/* Use flex column on mobile, grid on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6 mt-4">
        <div className="w-full lg:col-span-2">
          <ShoppingCart 
            cartItems={cartItems}
            onUpdateCart={handleUpdateCart}
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        </div>
        {/* The checkout review will be full width on mobile */}
        <div className="w-full">
          <div className="lg:sticky lg:top-4">
            <CheckoutReview 
              cartItems={cartItems}
              onUpdateCart={handleUpdateCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;