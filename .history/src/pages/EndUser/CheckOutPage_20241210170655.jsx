import React from "react";
import CheckoutForm from "../../components/EndUser/Checkout/CheckoutForm";
import CheckoutSummary from "../../components/EndUser/Checkout/CheckoutSummary";

const CheckOutPage = () => {
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
