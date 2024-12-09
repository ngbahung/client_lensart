import React, { useState } from 'react';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
  const handleContinueShopping = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <Breadcrumb items={cartBreadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="shopping-cart-container">
          <ShoppingCart 
            onContinueShopping={handleContinueShopping}
          />
        </div>
        <div className="checkout-review-container">
          <CheckoutReview />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;