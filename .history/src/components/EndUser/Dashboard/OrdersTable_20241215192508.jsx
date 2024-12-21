import React from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatPrice';

function OrdersTable({ orders }) {
  const formatStatus = (status) => {
    const statusMap = {
      'pending': 'Chờ xử lý',
      'processing': 'Đang xử lý',
      'shipping': 'Đang giao hàng',
      'delivered': 'Đã giao hàng',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const MobileOrderCard = ({ order }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">#{order.id}</span>
        <span className="text-sm text-blue-600">{formatStatus(order.status)}</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        {formatDate(order.createdAt)}
      </div>
      <div className="text-right font-medium">
        {formatPrice(order.total)}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

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
                Tổng tiền
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatStatus(order.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
