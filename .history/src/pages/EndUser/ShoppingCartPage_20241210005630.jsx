import React, { useState } from 'react';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]); // Replace useCart with local state
  const cartBreadcrumbItems = ["Trang chủ", "Giỏ hàng"];

  const handleContinueShopping = () => {
    window.history.back();
  };

  const handleUpdateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    // Add checkout logic here
    console.log('Processing checkout...');
  };

  const handleSelectItem = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedItems);
  };

  const handleSelectAll = (isSelected) => {
    const updatedItems = cartItems.map(item => ({ ...item, selected: isSelected }));
    setCartItems(updatedItems);
  };

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
    <div className="container mx-auto max-w-7xl">
      <Breadcrumb items={cartBreadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="shopping-cart-container lg:col-span-2">
          <ShoppingCart 
            cartItems={cartItems}
            onUpdateCart={handleUpdateCart}
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        </div>
        <div className="checkout-review-container">
          <CheckoutReview 
            cartItems={cartItems}
            onUpdateCart={handleUpdateCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;