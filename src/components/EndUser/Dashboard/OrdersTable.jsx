import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatPrice';
import { fetchOrders, cancelOrder } from '../../../api/ordersAPI';
import { createPayOSCheckout } from '../../../api/checkoutAPI';
import Swal from 'sweetalert2';
import { FiShoppingBag, FiPackage, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';

function OrdersTable({ onOrderSelect }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [repayingOrderId, setRepayingOrderId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

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

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Xác nhận hủy đơn hàng?',
        text: "Bạn không thể hoàn tác sau khi hủy!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Hủy đơn',
        cancelButtonText: 'Không',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          setCancellingOrderId(orderId);
          try {
            await cancelOrder(orderId);
            const updatedOrders = await fetchOrders();
            setOrders(updatedOrders);
            return true;
          } catch (error) {
            Swal.showValidationMessage(
              'Không thể hủy đơn hàng. Vui lòng thử lại sau.'
            );
            return false;
          } finally {
            setCancellingOrderId(null);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: 'Đã hủy đơn hàng!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      setCancellingOrderId(null);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Không thể hủy đơn hàng. Vui lòng thử lại sau.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const handleRepayment = async (order) => {
    setRepayingOrderId(order.id);
    try {
      // Calculate shipping fee (same logic as in checkout)
      const shippingFee = order.total_price >= 1000000 ? 0 : 20000;
      
      const paymentResponse = await createPayOSCheckout(order.id, shippingFee);
      
      if (paymentResponse.data.checkoutUrl) {
        // Store order info in sessionStorage
        sessionStorage.setItem('pendingOrderId', order.id);
        
        const returnUrl = new URL(paymentResponse.data.checkoutUrl);
        returnUrl.searchParams.append('orderId', order.id);
        window.location.href = returnUrl.toString();
      } else {
        throw new Error('Invalid payment URL');
      }
    } catch (error) {
      setRepayingOrderId(null);
      toast.error('Không thể tạo liên kết thanh toán. Vui lòng thử lại sau.');
      console.error('Payment creation error:', error);
    }
  };

  const isWithin24Hours = (orderDate) => {
    const now = new Date();
    const orderTime = new Date(orderDate);
    const diffInHours = (now - orderTime) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  const canRepayOrder = (order) => {
    return (
      order.payment_method === 'Chuyển khoản' &&
      order.payment_status === 'Chưa thanh toán' &&
      isWithin24Hours(order.date)
    );
  };

  const handleRowClick = (orderId, e) => {
    // Prevent navigation when clicking the cancel button
    if (e.target.closest('button')) return;
    onOrderSelect(orderId);
  };

  const CancelButton = ({ orderId, className }) => (
    <button
      onClick={() => handleCancelOrder(orderId)}
      disabled={cancellingOrderId === orderId}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]`}
    >
      {cancellingOrderId === orderId ? (
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : 'Hủy đơn'}
    </button>
  );

  const RepayButton = ({ order, className }) => (
    <button
      onClick={() => handleRepayment(order)}
      disabled={repayingOrderId === order.id}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]`}
    >
      {repayingOrderId === order.id ? (
        <>
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs">Đang xử lý...</span>
        </>
      ) : (
        <>
          <FiCreditCard className="mr-2" />
          Thanh toán
        </>
      )}
    </button>
  );

  const MobileOrderCard = ({ order }) => (
    <div 
      className="bg-white p-5 rounded-xl shadow-md mb-4 border border-gray-100 hover:border-[#6fd4d2] hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={(e) => handleRowClick(order.id, e)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-lg">
            <FiPackage className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-800">#{order.id}</span>
        </div>
        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-3 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatDate(order.date)}
      </div>
      <div className="text-sm mb-3 space-y-1.5">
        <div className="flex items-center text-gray-600">
          <span className="font-medium mr-2">Phương thức:</span> 
          <span className="text-gray-800">{order.payment_method}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-2">TT thanh toán:</span> 
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.payment_status)}`}>
            {order.payment_status}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="text-lg font-bold text-[#6fd4d2]">{formatPrice(order.total_price)}</div>
        <div className="flex gap-2">
          {order.payment_method === 'Tiền mặt' && order.order_status === 'Đang xử lý' && (
            <CancelButton
              orderId={order.id}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 text-sm font-medium shadow-md"
            />
          )}
          {canRepayOrder(order) && (
            <RepayButton
              order={order}
              className="px-4 py-2 bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white rounded-lg hover:from-[#55d5d2] hover:to-[#45c5c2] text-sm font-medium shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300">
      {/* Header with gradient accent */}
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
        <div className="p-3 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-xl shadow-md">
          <FiShoppingBag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của bạn</h2>
          <p className="text-sm text-gray-500 mt-1">
            {orders.length > 0 ? `Tổng ${orders.length} đơn hàng` : 'Chưa có đơn hàng nào'}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#eff9f9] to-white rounded-full flex items-center justify-center">
            <FiShoppingBag className="w-12 h-12 text-[#6fd4d2]" />
          </div>
          <p className="text-gray-500 text-lg mb-2">Chưa có đơn hàng nào</p>
          <p className="text-gray-400 text-sm">Các đơn hàng của bạn sẽ hiển thị tại đây</p>
        </div>
      ) : (
        <>
          {/* Mobile view */}
          <div className="lg:hidden space-y-4">
            {orders.map(order => (
              <MobileOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden lg:block rounded-xl border border-gray-200">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-[#eff9f9] to-white border-b-2 border-[#6fd4d2]/20">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase w-[10%]">
                    Mã ĐH
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase w-[22%]">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase w-[15%]">
                    Ngày đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase w-[15%]">
                    Thanh toán
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase w-[15%]">
                    Tổng tiền
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase w-[13%]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr 
                    key={order.id}
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-[#eff9f9] hover:to-white transition-all duration-200 group"
                    onClick={(e) => handleRowClick(order.id, e)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-800 text-sm">#{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1.5">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.order_status)}`}>
                          {order.order_status}
                        </span>
                        <div className="flex items-center text-xs text-gray-600">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(order.payment_status)}`}>
                            {order.payment_status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-700">
                        {formatDate(order.date)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">
                        {order.payment_method}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#6fd4d2] text-sm">{formatPrice(order.total_price)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        {order.payment_method === 'Tiền mặt' && order.order_status === 'Đang xử lý' && (
                          <CancelButton
                            orderId={order.id}
                            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium shadow-sm text-xs"
                          />
                        )}
                        {canRepayOrder(order) && (
                          <RepayButton
                            order={order}
                            className="px-3 py-1.5 bg-gradient-to-r from-[#6fd4d2] to-[#55d5d2] text-white rounded-lg hover:from-[#55d5d2] hover:to-[#45c5c2] font-medium shadow-sm text-xs"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersTable;
