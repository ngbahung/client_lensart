import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatPrice';
import { fetchOrders } from '../../../api/ordersAPI';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      'Đã hủy': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const MobileOrderCard = ({ order }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200 hover:border-blue-500 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className="font-medium">#{order.id}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        {formatDate(order.date)}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <div>Phương thức: {order.payment_method}</div>
        {order.note && <div>Ghi chú: {order.note}</div>}
      </div>
      <div className="text-right font-medium">
        {formatPrice(order.total_price)}
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
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.payment_method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {order.note || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(order.total_price)}
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
