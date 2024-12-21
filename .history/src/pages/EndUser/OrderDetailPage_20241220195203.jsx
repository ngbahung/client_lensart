import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Detail = ({ order, onClose, onUpdate }) => {
  const printRef = useRef();
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
              name: `${data.user.firstname} ${data.user.lastname}`,
              phone: data.user.phone || 'N/A',
              address: data.user.address || 'N/A',
              orderAddress: data.address || 'N/A',
            },
            order: {
              id: data.id,
              date: new Date(data.date).toLocaleDateString(),
              status: data.order_status,
              items: data.order_details.map(item => ({
                name: item.name,
                variant: item.color,
                price: parseFloat(item.price),
                quantity: item.quantity,
                total: parseFloat(item.total_price),
                originalPrice: parseFloat(item.price),
                discountedPrice: item.offer_price ? parseFloat(item.offer_price) : null
              }))
            },
            payment: {
              method: data.payment_method,
              transactionCode: `ORDER-${data.id}`,
              status: data.payment_status
            },
            totals: {
              subtotal: data.order_details.reduce((acc, item) =>
                acc + (parseFloat(item.price) * item.quantity), 0),
              shipping: 0, // Add if shipping fee is included in your data
              discount: data.coupon ? parseFloat(data.coupon.discount_price) : 0,
              total: parseFloat(data.total_price)
            },
            branch: data.branch ? {
              name: data.branch.name,
              address: data.branch.address
            } : null
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
        setError("Changes saved successfully!");
        // Call onUpdate callback and close form after a short delay
        setTimeout(() => {
          onUpdate();
          onClose();
        }, 1000);
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

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order_${orderDetail.order.id}.pdf`);
  };

  if (!orderDetail) return null;

  return (
    <div className="invoice-container p-10 max-w-[1600px] mx-auto bg-white shadow-xl rounded-lg mt-5 mb-10 w-[95%]">
      {/* Back button - Hide in PDF */}
      <div className="print-hide">
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
      </div>

      {/* Wrapper for print margins */}
      <div className="print-wrapper">
        {/* Printable content */}
        <div ref={printRef} className="print-content">
          {/* Company Info */}
          <div className="print-section invoice-header text-center mb-8">
            <h1 className="text-3xl font-bold text-[#55D5D2]">LENS ART</h1>
            <p className="text-gray-600">Email: contact@gmail.lensart.vn</p>
            <p className="text-gray-600">Số điện thoại: 0823427942</p>
            <div className="border-b-2 border-gray-200 my-4"></div>
          </div>

          {/* Main Content */}
          <div className="print-section invoice-content">
            {/* Customer and Order Info */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-xl font-bold mb-4">Hóa đơn</h1>
                <p className="font-bold">Khách hàng:</p>
                <p>
                  {orderDetail.customer.name} - {orderDetail.customer.phone} <br />
                  {orderDetail.customer.address}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-5">Đơn hàng #{orderDetail.order.id}</h2>
                <p className="font-bold">Địa chỉ giao hàng:</p>
                <p>
                  {orderDetail.customer.name} - {orderDetail.customer.phone} <br />
                  {orderDetail.customer.orderAddress}
                </p>
                {orderDetail.branch && (
                  <div className="mt-2">
                    <p className="font-bold">Chi nhánh:</p>
                    <p>{orderDetail.branch.name} - {orderDetail.branch.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Thông tin thanh toán:</h2>
              <div className="grid grid-cols-3 gap-2">
                <p>Phương thức:</p>
                <p>{orderDetail.payment.method}</p>
                <h2 className="font-semibold">Ngày đặt hàng: </h2>
                <p>Tên đơn hàng:</p>
                <p>{orderDetail.payment.transactionCode}</p>
                <p>{orderDetail.order.date}</p>
                <p>Trạng thái:</p>
                <p style={{ color: '#FF9A62' }}>{orderDetail.payment.status}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Tóm tắt đơn hàng</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Sản phẩm</th>
                    <th className="text-left p-2">Màu sắc</th>
                    <th className="text-left p-2">Giá gốc</th>
                    <th className="text-left p-2">Giá sau giảm</th>
                    <th className="text-left p-2">Số lượng</th>
                    <th className="text-left p-2">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.order.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.variant}</td>
                      <td className="p-2">{formatCurrency(item.originalPrice)}</td>
                      <td className="p-2">{item.discountedPrice ? formatCurrency(item.discountedPrice) : '-'}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          </div>

          {/* Footer with Signatures */}
          <div className="print-section invoice-footer">
            <div className="grid grid-cols-2 gap-4 mt-12 text-center">
              <div>
                <p className="font-semibold mb-16">Người lập phiếu</p>
                <p>(Ký và ghi rõ họ tên)</p>
              </div>
              <div>
                <p className="font-semibold mb-16">Khách hàng</p>
                <p>(Ký và ghi rõ họ tên)</p>
              </div>
            </div>
            {/* Add spacing for signatures */}
            <div className="mt-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-12 text-center">


          
          </div>
          
        </div>
      </div>

      {/* Controls section - Hide in PDF */}
      <div className="print-hide mt-8">
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-[rgba(85,213,210,1)] text-white font-bold rounded-md shadow-md hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded-md shadow-md hover:bg-gray-600"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
