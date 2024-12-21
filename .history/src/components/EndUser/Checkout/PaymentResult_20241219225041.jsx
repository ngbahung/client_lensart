import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../../services/paymentApi';
import { toast } from 'react-toastify';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPaymentResult = async () => {
      try {
        const paymentId = searchParams.get('paymentId');
        if (!paymentId) {
          throw new Error('Payment ID not found');
        }

        const result = await verifyPayment(paymentId);
        
        if (result.status === 'success') {
          toast.success('Thanh toán thành công!');
          navigate('/order-success');
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Xác thực thanh toán thất bại');
        navigate('/checkout');
      } finally {
        setVerifying(false);
      }
    };

    verifyPaymentResult();
  }, [searchParams, navigate]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Đang xác thực thanh toán...</h2>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentResult;
