import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatPrice';
import { fetchOrders, cancelOrder } from '../../../api/ordersAPI';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

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
      await cancelOrder(orderId);
      // Refresh orders after cancellation
      const updatedOrders = await fetchOrders();
      setOrders(updatedOrders);
    } catch (err) {
      setError('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
    }
    setConfirmCancel(null);
  };

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
          <button
            onClick={() => setConfirmCancel(order.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Hủy đơn
          </button>
        )}
      </div>
    </div>
  );

  if (loading) return <div className="text-center py-4">Đang tải...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
      {/* Confirm Dialog */}
      {confirmCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4">Xác nhận hủy đơn hàng?</h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setConfirmCancel(null)}
              >
                Không
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleCancelOrder(confirmCancel)}
              >
                Hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}

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
                      {order.order_status === 'Đang xử lý' && (
                        <button
                          onClick={() => setConfirmCancel(order.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Hủy đơn
                        </button>
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
