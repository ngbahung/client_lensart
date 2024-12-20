import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaShippingFast, FaReceipt } from 'react-icons/fa';
import { getPaymentInfo, updatePaymentStatus } from '../../api/checkoutAPI';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const transactionId = searchParams.get('transactionId');
      const orderId = searchParams.get('orderId');
      
      if (transactionId && orderId) {
        try {
          const data = await getPaymentInfo(transactionId);
          if (data.status === 'PAID') {
            await updatePaymentStatus(orderId);
          }
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100 border-t-indigo-500"></div>
        <p className="mt-4 text-gray-600">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#6fd4d2] px-8 py-6">
          <div className="text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-white" />
            <h2 className="mt-4 text-3xl font-extrabold text-white">
              Đặt hàng thành công!
            </h2>
            <p className="mt-2 text-indigo-100">
              Cảm ơn bạn đã tin tưởng và mua hàng tại cửa hàng chúng tôi
            </p>
          </div>
        </div>

        <div className="px-8 py-6">
          {paymentInfo && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaReceipt className="h-6 w-6 text-[#6fd4d2]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Mã đơn hàng</p>
                    <p className="text-lg font-bold text-[#6fd4d2]">#{paymentInfo.orderId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                  <p className="text-lg font-bold text-[#6fd4d2]">
                    {paymentInfo.amount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <FaBox className="h-6 w-6 text-[#6fd4d2]" />
                  <p className="mt-2 font-medium">Phương thức thanh toán</p>
                  <p className="text-sm text-gray-600">{paymentInfo.paymentMethod}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <FaShippingFast className="h-6 w-6 text-[#6fd4d2]" />
                  <p className="mt-2 font-medium">Trạng thái</p>
                  <p className="text-sm text-gray-600">
                    {paymentInfo.status === 'PAID' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6fd4d2] hover:bg-[#6fd4d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
