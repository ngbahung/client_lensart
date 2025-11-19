import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2';
import { fetchOrderById, cancelOrder } from '../../../api/ordersAPI';
import { createPayOSCheckout } from '../../../api/checkoutAPI';
import { formatPrice } from '../../../utils/formatPrice';
import { formatDate } from '../../../utils/dateUtils';
import { FiPackage, FiUser, FiMapPin, FiCalendar, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';

function OrderDetail({ orderId, onBack }) {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [repaying, setRepaying] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'Đang giao hàng': 'bg-purple-100 text-purple-700 border border-purple-200',
      'Đã giao': 'bg-green-100 text-green-700 border border-green-200',
      'Chờ xử lý': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      'Đã hủy': 'bg-red-100 text-red-700 border border-red-200',
      'Đã thanh toán': 'bg-blue-100 text-blue-700 border border-blue-200',
      'Chưa thanh toán': 'bg-orange-100 text-orange-700 border border-orange-200',
      'Đang xử lý': 'bg-cyan-100 text-cyan-700 border border-cyan-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const isWithin24Hours = (orderDate) => {
    const now = new Date();
    const orderTime = new Date(orderDate);
    const diffInHours = (now - orderTime) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  const getPaymentDeadline = (orderDate) => {
    const orderTime = new Date(orderDate);
    const deadline = new Date(orderTime.getTime() + 24 * 60 * 60 * 1000);
    
    // Format: DD/MM/YYYY HH:MM
    const day = String(deadline.getDate()).padStart(2, '0');
    const month = String(deadline.getMonth() + 1).padStart(2, '0');
    const year = deadline.getFullYear();
    const hours = String(deadline.getHours()).padStart(2, '0');
    const minutes = String(deadline.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const canRepayOrder = (order) => {
    return (
      order.payment_method === 'Chuyển khoản' &&
      order.payment_status === 'Chưa thanh toán' &&
      isWithin24Hours(order.date)
    );
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await fetchOrderById(orderId);
        if (data) {
          setOrderDetail(data);
        }
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      title: 'Xác nhận hủy đơn',
      text: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Không'
    });

    if (result.isConfirmed) {
      setCancelling(true);
      try {
        const response = await cancelOrder(orderId);
        if (response && response.success) {
          setOrderDetail(prev => ({
            ...prev,
            order_status: 'Đã hủy'
          }));
          Swal.fire({
            title: 'Thành công!',
            text: 'Đơn hàng đã được hủy',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        }
      } catch (err) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Không thể hủy đơn hàng.',
          icon: 'error',
        });
        setError('Không thể hủy đơn hàng.');
      } finally {
        setCancelling(false);
      }
    }
  };

  const handleRepayment = async () => {
    setRepaying(true);
    try {
      // Calculate shipping fee (same logic as in checkout)
      const shippingFee = orderDetail.total_price >= 1000000 ? 0 : 20000;
      
      const paymentResponse = await createPayOSCheckout(orderId, shippingFee);
      
      if (paymentResponse.data.checkoutUrl) {
        // Store order info in sessionStorage
        sessionStorage.setItem('pendingOrderId', orderId);
        
        const returnUrl = new URL(paymentResponse.data.checkoutUrl);
        returnUrl.searchParams.append('orderId', orderId);
        window.location.href = returnUrl.toString();
      } else {
        throw new Error('Invalid payment URL');
      }
    } catch (error) {
      setRepaying(false);
      toast.error('Không thể tạo liên kết thanh toán. Vui lòng thử lại sau.');
      console.error('Payment creation error:', error);
    }
  };

  if (loading) return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6fd4d2] border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600">Đang tải...</p>
    </div>
  );
  if (error) return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center">
      <div className="text-red-500 mb-2">⚠️</div>
      <p className="text-red-500">{error}</p>
    </div>
  );
  if (!orderDetail) return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
      <p className="text-gray-500">Không tìm thấy đơn hàng</p>
    </div>
  );

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#6fd4d2] transition-colors font-medium group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Quay lại
        </button>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-lg">
            <FiPackage className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Đơn hàng #{orderId}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Info */}
        <div className="bg-gradient-to-br from-[#eff9f9] to-white p-6 rounded-xl border border-[#6fd4d2]/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-lg">
              <FiUser className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Thông tin khách hàng</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-start">
              <span className="font-medium text-gray-600 w-20">Tên:</span>
              <span className="text-gray-800">{`${orderDetail.user.firstname} ${orderDetail.user.lastname}`}</span>
            </p>
            <p className="flex items-start">
              <span className="font-medium text-gray-600 w-20">SĐT:</span>
              <span className="text-gray-800">{orderDetail.user.phone}</span>
            </p>
            <p className="flex items-start">
              <span className="font-medium text-gray-600 w-20">Địa chỉ:</span>
              <span className="text-gray-800">{orderDetail.address}</span>
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-gradient-to-br from-[#eff9f9] to-white p-6 rounded-xl border border-[#6fd4d2]/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-lg">
              <FiCalendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Thông tin đơn hàng</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-center">
              <span className="font-medium text-gray-600 w-32">Ngày đặt:</span>
              <span className="text-gray-800">{formatDate(orderDetail.date)}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-600 w-32">Phương thức:</span>
              <span className="text-gray-800">{orderDetail.payment_method}</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-600 w-32">TT thanh toán:</span>
              <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${getStatusColor(orderDetail.payment_status)}`}>
                {orderDetail.payment_status}
              </span>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-600 w-32">TT đơn hàng:</span>
              <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${getStatusColor(orderDetail.order_status)}`}>
                {orderDetail.order_status}
              </span>
            </p>
            {orderDetail.note && (
              <p className="mt-3 pt-3 border-t border-gray-200">
                <span className="font-semibold text-gray-700">Ghi chú:</span>
                <span className="text-gray-600 block mt-1">{orderDetail.note}</span>
              </p>
            )}
          </div>
          
          {/* Branch Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <FiMapPin className="w-4 h-4 text-[#6fd4d2]" />
              <h4 className="font-bold text-gray-800 text-sm">Chi nhánh</h4>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-800 font-medium">{orderDetail.branch.name}</p>
              <p className="text-gray-600">{orderDetail.branch.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Deadline Notice */}
      {canRepayOrder(orderDetail) && (
        <div className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-orange-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-orange-800 text-sm">Thời hạn thanh toán</p>
              <p className="text-orange-700 text-sm mt-1">
                Vui lòng thanh toán trước <span className="font-bold">{getPaymentDeadline(orderDetail.date)}</span> để đơn hàng không bị hủy tự động.
              </p>
            </div>
          </div>
        </div>
      )}

      {(orderDetail.order_status === 'Đang xử lý' || canRepayOrder(orderDetail)) && (
        <div className="mb-6 flex gap-3 flex-wrap">
          {orderDetail.order_status === 'Đang xử lý' && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl disabled:opacity-50 font-medium shadow-md transition-all duration-200"
            >
              {cancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
            </button>
          )}
          {canRepayOrder(orderDetail) && (
            <button
              onClick={handleRepayment}
              disabled={repaying}
              className="bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] hover:from-[#55d5d2] hover:to-[#45c5c2] text-white px-6 py-2.5 rounded-xl disabled:opacity-50 font-medium shadow-md transition-all duration-200 flex items-center gap-2"
            >
              {repaying ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <FiCreditCard className="w-5 h-5" />
                  Thanh toán ngay
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Expired Payment Notice */}
      {orderDetail.payment_method === 'Chuyển khoản' && 
       orderDetail.payment_status === 'Chưa thanh toán' && 
       !isWithin24Hours(orderDetail.date) && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-red-800 text-sm">Hết thời hạn thanh toán</p>
              <p className="text-red-700 text-sm mt-1">
                Đơn hàng này đã quá thời hạn thanh toán 24 giờ và sẽ bị hủy tự động.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="mt-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-lg">
            <FiPackage className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-800">Chi tiết sản phẩm</h3>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#eff9f9] to-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Màu sắc</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Số lượng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tổng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orderDetail.order_details.map((item, index) => (
                <tr key={index} className="hover:bg-gradient-to-r hover:from-[#eff9f9] hover:to-white transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700">{item.color}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formatPrice(item.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="bg-[#6fd4d2]/10 text-[#6fd4d2] px-3 py-1 rounded-lg font-semibold">{item.quantity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[#6fd4d2]">{formatPrice(item.total_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 border-t-2 border-[#ecaa83]/30 pt-6">
        <div className="flex justify-end">
          <div className="w-full md:w-96 bg-gradient-to-br from-[#eff9f9] to-white p-6 rounded-xl border border-[#6fd4d2]/20">
            <div className="flex items-center space-x-2 mb-4">
              <FiCreditCard className="w-5 h-5 text-[#6fd4d2]" />
              <h4 className="font-bold text-gray-800">Tổng thanh toán</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính:</span>
                <span className="font-medium">{formatPrice(orderDetail.total_price)}</span>
              </div>
              {orderDetail.coupon && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Giảm giá:</span>
                  <span>-{formatPrice(orderDetail.coupon.discount_price)}</span>
                </div>
              )}
              {orderDetail.total_price < 1000000 && (
                <div className="flex justify-between text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span className="font-medium">{formatPrice(20000)}</span>
                </div>
              )}
              <div className="border-t-2 border-[#6fd4d2]/20 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-[#6fd4d2]">
                    {formatPrice(
                      orderDetail.total_price + 
                      (orderDetail.total_price < 1000000 ? 20000 : 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
