import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatPrice';
import { fetchOrders, cancelOrder } from '../../../api/ordersAPI';
import Swal from 'sweetalert2';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

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
      'Đang giao hàng': 'bg-purple-100 text-purple-800',
      'Đã giao': 'bg-green-100 text-green-800',
      'Chờ xử lý': 'bg-yellow-100 text-yellow-800',
      'Đã hủy': 'bg-red-100 text-red-800',
      'Đã thanh toán': 'bg-blue-100 text-blue-800',
      'Chưa thanh toán': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  const MobileOrderCard = ({ order }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200 hover:border-blue-500 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className="font-medium">#{order.id}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-2 font-medium">
        {formatDate(order.date)}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <div>Chi nhánh: {order.branchName}</div>
        <div>Phương thức: {order.payment_method}</div>
        <div>Trạng thái thanh toán: 
          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.payment_status)}`}>
            {order.payment_status}
          </span>
        </div>
        {order.note && <div>Ghi chú: {order.note}</div>}
      </div>
      <div className="text-right font-medium flex justify-between items-center mt-3">
        <div>{formatPrice(order.total_price)}</div>
        {order.order_status === 'Chờ xử lý' && (
          <CancelButton
            orderId={order.id}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          />
        )}
      </div>
    </div>
  );

  if (loading) return <div className="text-center py-4">Đang tải...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Chưa có đơn hàng nào</p>
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
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi nhánh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.branchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.payment_method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {order.note || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(order.total_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.order_status === 'Chờ xử lý' && (
                        <CancelButton
                          orderId={order.id}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        />
                      )}
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
