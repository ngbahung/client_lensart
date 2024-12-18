import React, { useEffect } from "react";
import CheckoutForm from "../../components/EndUser/Checkout/CheckoutForm";
import CheckoutSummary from "../../components/EndUser/Checkout/CheckoutSummary";
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    document.title = 'Thanh toán | LensArt EyeWear';
    
    // Check for selected items
    const selectedItems = items.filter(item => item.selected);
    if (selectedItems.length === 0) {
      navigate('/gio-hang');
      return;
    }
    setIsLoading(false);
  }, [items, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <CheckoutForm />
          </div>
          <div className="order-1 lg:order-2">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
