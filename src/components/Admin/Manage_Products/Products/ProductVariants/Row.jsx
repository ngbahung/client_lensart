import React from "react";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";

const Row = ({ variant, onEdit }) => {
  const handleEdit = () => {
    onEdit(variant);
  };

  if (!variant) {
    return null;
  }

  return (
    <tr className="hover:bg-gray-100 h-[48px]">
      <td className="py-2 px-4">{variant?.id || 'N/A'}</td>
      <td className="py-2 px-4">{variant?.branch_id || 'N/A'}</td>
      <td className="py-2 px-4">{variant?.color || 'N/A'}</td>
      <td className="py-2 px-4">{variant?.quantity ?? '0'}</td>
      <td className="py-2 px-4 grid place-items-center">
        <button
          className="p-1.5 rounded-md bg-[rgba(123,212,111,1)] hover:opacity-80"
          onClick={handleEdit}
        >
          <BiEdit size={20} className="text-white" />
        </button>
      </td>
    </tr>
  );
};

Row.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    product_id: PropTypes.number,
    branch_id: PropTypes.number,
    color: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
