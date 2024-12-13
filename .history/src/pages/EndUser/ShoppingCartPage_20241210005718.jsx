import React, { useState } from 'react';
import ShoppingCart from '../../components/EndUser/ShoppingCart/ShoppingCart';
import CheckoutReview from '../../components/EndUser/ShoppingCart/CheckoutReview';
import Breadcrumb from '../../components/EndUser/Breadcrumb/Breadcrumb';

const ShoppingCartPage = () => {
  const mockGlasses = [
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      price: 3590000,
      image: "https://assets.ray-ban.com/is/image/RayBan/805289602057_1.png",
      quantity: 1,
      selected: true
    },
    {
      id: 2,
      name: "Oakley Holbrook",
      price: 2890000,
      image: "https://assets.oakley.com/is/image/OakleyEYE/888392487568_1.png",
      quantity: 2,
      selected: true
    },
    {
      id: 3,
      name: "Gucci Square Acetate",
      price: 7890000,
      image: "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1686893741/725662_J1691_1162_001_100_0000_Light.jpg",
      quantity: 1,
      selected: true
    }
  ];

  const [cartItems, setCartItems] = useState(mockGlasses);
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