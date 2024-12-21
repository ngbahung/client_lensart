import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import ConfirmChangeStatusModal from "./ConfirmChangeStatusModal";

const ToggleSwitch = ({ id, status, onToggle, disabled }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={`toggle-${id}`}
        checked={status === 'active'}
        onChange={() => onToggle(id)}
        className="sr-only"
        disabled={disabled}
      />
      <label
        htmlFor={`toggle-${id}`}
        className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors ${
          status === 'active' ? "bg-[#55d5d2]" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            status === 'active' ? "translate-x-9" : "translate-x-1"
          }`}
        ></span>
      </label>
    </div>
  );
};

const Row = ({ branch, onStatusChange, onEdit }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(branch.id);
      setShowStatusModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelStatusChange = () => {
    setShowStatusModal(false);
  };

  const handleEdit = () => {
    onEdit(branch);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 h-[48px]">
        <td className="py-2 px-4">{branch.id}</td>
        <td className="py-2 px-4">{branch.branch_name}</td>
        <td className="py-2 px-4">{branch.address}</td>
        <td className="py-2 px-4">{branch.manager_name || 'N/A'}</td>
        <td className="py-2 px-4">{branch.index || '-'}</td>
        <td className="py-2 px-4">
          <ToggleSwitch
            id={branch.id}
            status={branch.status}
            onToggle={handleStatusChange}
            disabled={isUpdating}
          />
        </td>
        <td className="py-2 px-4 grid place-items-center">
          <button
            className="p-1.5 rounded-md bg-[rgba(123,212,111,1)] hover:opacity-80"
            onClick={handleEdit}
          >
            <BiEdit size={20} className="text-white" />
          </button>
        </td>
      </tr>

      {showStatusModal && (
        <ConfirmChangeStatusModal
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
          isLoading={isUpdating}
        />
      )}
    </>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Row.propTypes = {
  branch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    branch_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    manager_name: PropTypes.string,
    index: PropTypes.number,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Row;
