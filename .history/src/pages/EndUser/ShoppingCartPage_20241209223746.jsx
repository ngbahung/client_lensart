import React, { useState } from 'react';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "GK.M GỌNG NHỰA AN221393",
      color: "Nâu",
      quantity: 2,
      price: 350000,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "GK.M GỌNG NHỰA AN221394",
      color: "Đen",
      quantity: 1,
      price: 450000,
      image: "https://via.placeholder.com/150",
    },
  ]);

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

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl p-8">
            onContinueShopping={handleContinueShopping}
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