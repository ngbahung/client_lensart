import React from "react";
import { FaRegEye } from "react-icons/fa";
import PropTypes from "prop-types";

const Row = ({ order, onShowDetail }) => {
  // Convert amount to number if it's a string
  const amount = typeof order.amount === 'string' ? parseFloat(order.amount) : order.amount;

  const formatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-[rgba(85,213,210,1)] text-white";
      case "Chưa thanh toán":
        return "bg-[rgba(217,217,217,1)] text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return 'bg-[rgba(111,212,210,0.5)] text-gray-800';
      case 'Đã xử lý và sẵn sàng giao hàng':
        return 'bg-[#FFEA79] text-gray-800';
      case 'Đang giao hàng':
        return 'bg-[rgba(236,144,92,0.75)] text-white';
      case 'Đã giao':
        return 'bg-[rgba(123,212,111,1)] text-white';
      case 'Đã hủy':
        return 'bg-[rgba(255,0,5,0.75)] text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return 'Pending';
      case 'Đã xử lý và sẵn sàng giao hàng':
        return 'Processed';
      case 'Đang giao hàng':
        return 'Shipping';
      case 'Đã giao':
        return 'Delivered';
      case 'Đã hủy':
        return 'Canceled';
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "Paid";
      case "Chưa thanh toán":
        return "Unpaid";
      default:
        return status;
    }
  };

  return (
    <tr className="hover:bg-gray-100 h-[48px]">
      <td className="py-2 px-4">{order.id}</td>
      <td className="py-2 px-4">{order.customer_name}</td>
      <td className="py-2 px-4">{amount.toLocaleString('vi-VN')} VNĐ</td>
      <td className="py-2 px-4">{order.date}</td>
      <td className="py-2 px-4">
        <div className="flex justify-start">
          <span className={`px-2 py-1 rounded-full text-sm w-[120px] inline-block text-center ${getOrderStatusStyle(order.order_status)}`}>
            {getOrderStatusLabel(order.order_status)}
          </span>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex justify-start">
          <span className={`px-2 py-1 rounded-full text-sm w-[100px] inline-block text-center ${getPaymentStatusStyle(order.payment_status)}`}>
            {getPaymentStatusLabel(order.payment_status)}
          </span>
        </div>
      </td>
      <td className="py-2 px-4 text-center">
        <div className="flex items-center justify-center h-full min-h-[64px]">
          <button
            className="p-1.5 rounded-md bg-[rgba(85,213,210,1)] hover:opacity-80"
            onClick={() => onShowDetail(order)}
          >
            <FaRegEye size={20} className="text-white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

Row.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer_name: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    date: PropTypes.string.isRequired,
    order_status: PropTypes.string.isRequired,
    payment_status: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetail: PropTypes.func.isRequired,
};

export default Row;
