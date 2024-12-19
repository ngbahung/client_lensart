import React from "react";
import PropTypes from "prop-types";

const Row = ({ transaction }) => {
  const formatAmount = (amount) => {
    // Remove any existing dots and spaces
    const cleanAmount = amount.replace(/[.,\s]/g, '');
    // Add dots for every 3 digits from the right
    return cleanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4">{transaction.id}</td>
      <td className="py-2 px-4">{transaction.order_id}</td>
      <td className="py-2 px-4">{transaction.payment_method}</td>
      <td className="py-2 px-4">{formatAmount(transaction.amount)}</td>
    </tr>
  );
};

Row.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_id: PropTypes.string.isRequired,
    payment_method: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }).isRequired,
};

export default Row;
