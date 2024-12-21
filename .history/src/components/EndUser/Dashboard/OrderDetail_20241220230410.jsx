import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2';
import { fetchOrderById, cancelOrder } from '../../../api/ordersAPI';
import { formatPrice } from '../../../utils/formatPrice';
import { formatDate } from '../../../utils/dateUtils';

function OrderDetail({ orderId, onBack }) {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

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

  if (loading) return <div className="text-center py-4">Đang tải...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!orderDetail) return <div className="text-center py-4">Không tìm thấy đơn hàng</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft /> Quay lại
        </button>
        <h2 className="text-xl font-semibold">Chi tiết đơn hàng #{orderId}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
          <p>Tên: {`${orderDetail.user.firstname} ${orderDetail.user.lastname}`}</p>
          <p>SĐT: {orderDetail.user.phone}</p>
          <p>Địa chỉ: {orderDetail.address}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
          <p>Ngày đặt: {formatDate(orderDetail.date)}</p>
          <p>Phương thức: {orderDetail.payment_method}</p>
          <p>Trạng thái thanh toán: {orderDetail.payment_status}</p>
          <p>Trạng thái đơn hàng: {orderDetail.order_status}</p>
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold mb-2">Chi nhánh</h3>
            <p>Tên chi nhánh: {orderDetail.branch.name}</p>
            <p>Địa chỉ: {orderDetail.branch.address}</p>
          </div>
        </div>
      </div>

      {orderDetail.order_status === 'Đang xử lý' && (
        <div className="mb-6">
          <button
            onClick={handleCancelOrder}
            disabled={cancelling}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {cancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
          </button>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold mb-4">Chi tiết sản phẩm</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Màu sắc</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderDetail.order_details.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatPrice(item.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatPrice(item.total_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span>Tạm tính:</span>
              <span>{formatPrice(orderDetail.total_price)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng:</span>
              <span>
                {formatPrice(
                  orderDetail.total_price - (orderDetail.coupon ? orderDetail.coupon.discount_price : 0)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
