import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { getPaymentInfo } from '../../api/checkoutAPI';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const transactionId = searchParams.get('transactionId');
      if (transactionId) {
        try {
          const data = await getPaymentInfo(transactionId);
          setPaymentInfo(data);
        } catch (error) {
          console.error('Failed to fetch payment info:', error);
        }
      }
      setLoading(false);
    };

    fetchPaymentDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Đặt hàng thành công!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-600">
            {paymentInfo ? (
              <>
                <p>Mã đơn hàng: #{paymentInfo.orderId}</p>
                <p className="mt-2">Phương thức thanh toán: {paymentInfo.paymentMethod}</p>
                <p className="mt-2">Tổng tiền: {paymentInfo.amount.toLocaleString('vi-VN')}đ</p>
                <p className="mt-2">Trạng thái: {paymentInfo.status === 'PAID' ? 'Đã thanh toán' : 'Chờ thanh toán'}</p>
              </>
            ) : (
              <p>Mã đơn hàng sẽ được gửi qua email của bạn.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
