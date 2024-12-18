import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';
import CartDebug from '../components/EndUser/ShoppingCart/CartDebug';

const ShoppingCartPage = () => {
  const { items: cartItems, loading, error, refreshCart } = useCart();
  const navigate = useNavigate();
  const cartBreadcrumbItems = ["Trang chủ", "Giỏ hàng"]; // Add missing breadcrumb items
  
  useEffect(() => {
    document.title = 'Giỏ hàng | LensArt EyeWear';
    refreshCart();
  }, [refreshCart]); // Add dependency

  const handleContinueShopping = () => {
    navigate('/'); // Change to home page instead of using window.history
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto max-w-7xl p-2">
      <Breadcrumb items={cartBreadcrumbItems} />
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <h2 className="text-xl text-red-500 mb-4">{error}</h2>
          <button 
            className="bg-teal-500 text-white px-6 py-2 rounded-lg"
            onClick={refreshCart}
          >
            Thử lại
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <button 
            className="bg-orange-500 text-white px-6 py-2 rounded-lg"
            onClick={handleContinueShopping}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6 mt-4">
          <div className="w-full lg:col-span-2">
            <ShoppingCart onContinueShopping={handleContinueShopping} />
          </div>
          <div className="w-full">
            <div className="lg:sticky lg:top-4">
              <CheckoutReview 
                cartItems={cartItems.filter(item => item.selected)} 
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;