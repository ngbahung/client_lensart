
import React, { useState } from 'react';


const ShoppingCartPage = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleContinueShopping = () => {
    // Navigate to products page
    window.history.back();
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleBackToCart = () => {
    setIsCheckingOut(false);
  };

  return (
    <div className="container mx-auto max-w-6xl">
      {!isCheckingOut ? (
        <div className="shopping-cart-container">
          <ShoppingCart 
            onContinueShopping={handleContinueShopping}
            onCheckout={handleProceedToCheckout}
          />
        </div>
      ) : (
        <div className="checkout-review-container">
          <CheckoutReview 
            onBackToCart={handleBackToCart}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;