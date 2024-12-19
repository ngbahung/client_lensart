import React from "react";

const ConfirmChangeStatusModal = ({ onConfirm, onCancel, isLoading, title, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] shadow-lg p-6 w-[450px] h-[200px]">
        <h2 className="text-lg font-bold text-center mb-2">
          {title || "Bạn có chắc chắn muốn thay đổi trạng thái không?"}
        </h2>
        <p className="text-center text-red-500 mb-6">
          {message || "Tác vụ này sẽ thay đổi trạng thái của danh mục"}
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-[rgb(85,213,210)] text-white font-semibold py-2 px-6 w-[120px] rounded-[20px] transition-colors hover:opacity-80 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Xác nhận"}
          </button>
          <button
            onClick={onCancel}
            className="border border-[rgb(85,213,210)] text-[rgb(85,213,210)] font-semibold py-2 px-6 w-[120px] rounded-[20px] transition-colors hover:bg-[rgb(85,213,210)]/10 disabled:opacity-50"
            disabled={isLoading}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChangeStatusModal;
