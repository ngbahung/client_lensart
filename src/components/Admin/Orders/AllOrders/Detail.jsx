import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Detail = ({ order, onClose }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details when component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/getById/${order.id}`);
        if (response.data && response.data.data) {
          const data = response.data.data;
          setOrderDetail({
            customer: {
              name: data.customer_name || order.customer_name || 'N/A',
              phone: data.phone || 'N/A',
              address: data.address || 'N/A',
              city: data.city || 'N/A',
              province: data.province || 'N/A'
            },
            order: {
              id: data.id || order.id,
              date: data.date || order.date,
              status: data.order_status || order.order_status,
              items: data.items || [{
                name: `Order #${order.id}`,
                variant: 'Default',
                price: order.amount,
                quantity: 1,
                total: order.amount
              }]
            },
            payment: {
              method: data.payment_method || 'N/A',
              transactionCode: data.transaction_code || `ORDER-${order.id}`,
              status: data.payment_status || order.payment_status
            },
            totals: {
              subtotal: data.amount || order.amount,
              shipping: data.shipping_fee || 0,
              discount: data.discount || 0,
              total: data.total || order.amount
            }
          });
        }
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details. Using fallback data.');
        // Fallback to basic order data if API fails
        setOrderDetail({
          customer: {
            name: order.customer_name || 'N/A',
            phone: 'N/A',
            address: 'N/A',
            city: 'N/A',
            province: 'N/A'
          },
          order: {
            id: order.id,
            date: order.date,
            status: order.order_status,
            items: [{
              name: `Order #${order.id}`,
              variant: 'N/A',
              price: order.amount,
              quantity: 1,
              total: order.amount
            }]
          },
          payment: {
            method: 'N/A',
            transactionCode: `ORDER-${order.id}`,
            status: order.payment_status
          },
          totals: {
            subtotal: order.amount,
            shipping: 0,
            discount: 0,
            total: order.amount
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order.id]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedOrderStatus = document.getElementById('order-status').value;
      const selectedPaymentStatus = document.getElementById('payment-status').value;

      const response = await axios.post(`http://localhost:8000/api/orders/update/${order.id}`, {
        order_status: selectedOrderStatus,
        payment_status: selectedPaymentStatus
      });
      
      if (response.status === 200) {
        setOrderDetail(prev => ({
          ...prev,
          order: { ...prev.order, status: selectedOrderStatus },
          payment: { ...prev.payment, status: selectedPaymentStatus }
        }));
        setError("Changes saved successfully!");
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusChange = (e) => {
    setOrderDetail(prev => ({
      ...prev,
      order: { ...prev.order, status: e.target.value }
    }));
  };

  const handlePaymentStatusChange = (e) => {
    setOrderDetail(prev => ({
      ...prev,
      payment: { ...prev.payment, status: e.target.value }
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (!orderDetail) return null;

  return (
    <div className="invoice-container p-10 max-w-[1600px] mx-auto bg-white shadow-xl rounded-lg mt-5 mb-10 w-[95%]">
      {/* Header Section with Border */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft /> Back to Orders
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl font-bold">Hóa đơn</h1>
          <p>Khách hàng:</p>
          <p>
            {orderDetail.customer.name} - {orderDetail.customer.phone} <br />
            {orderDetail.customer.address} <br />
            {orderDetail.customer.city}, {orderDetail.customer.province}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Đơn hàng #{orderDetail.order.id}</h2>
          <p>Địa chỉ giao hàng:</p>
          <p>
            {orderDetail.customer.name} - {orderDetail.customer.phone} <br />
            {orderDetail.customer.address} <br />
            {orderDetail.customer.city}, {orderDetail.customer.province}
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Thông tin thanh toán:</h2>
        <div className="grid grid-cols-3 ">
          <p>Phương thức:</p>
          <p>{orderDetail.payment.method}</p>
          <h2 className="text-lg font-semibold">Ngày đặt hàng: </h2>
          <p>Mã giao dịch:</p>
          <p>{orderDetail.payment.transactionCode}</p>
          <p>{orderDetail.order.date}</p>
          <p>Trạng thái:</p>
          <p>{orderDetail.payment.status}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Tóm tắt đơn hàng</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Item</th>
              <th className="text-left p-2">Variant</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Totals</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.variant}</td>
                <td className="p-2">{formatCurrency(item.price)}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Controls */}
      <div className="mb-8 flex gap-6">
        <div>
          <label htmlFor="order-status" className="block font-medium mb-2">
            Trạng thái đơn hàng
          </label>
          <select
            id="order-status"
            value={orderDetail.order.status}
            onChange={handleOrderStatusChange}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          >
            <option>Đang xử lý</option>
            <option>Đã xử lý và sẵn sàng giao hàng</option>
            <option>Đang giao hàng</option>
            <option>Đã giao</option>
            <option>Đã hủy</option>
          </select>
        </div>

        <div>
          <label htmlFor="payment-status" className="block font-medium mb-2">
            Trạng thái thanh toán
          </label>
          <select
            id="payment-status"
            value={orderDetail.payment.status}
            onChange={handlePaymentStatusChange}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          >
            <option>Chưa thanh toán</option>
            <option>Đã thanh toán</option>
          </select>
        </div>
      </div>

      {/* Totals */}
      <div className="mb-8">
        <div className="flex justify-between">
          <p className="font-medium">Tạm tính</p>
          <p>{formatCurrency(orderDetail.totals.subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Phí vận chuyển (+)</p>
          <p>{formatCurrency(orderDetail.totals.shipping)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Mã giảm giá (-)</p>
          <p>{formatCurrency(orderDetail.totals.discount)}</p>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-between font-bold text-lg">
          <p>Tổng tiền</p>
          <p>{formatCurrency(orderDetail.totals.total)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-[rgba(85,213,210,1)] text-white font-bold rounded-md shadow-md hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button className="px-6 py-2 bg-gray-500 text-white font-bold rounded-md shadow-md hover:bg-gray-600">
          Print
        </button>
      </div>
    </div>
  );
};

export default Detail;
