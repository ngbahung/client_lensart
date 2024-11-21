import { FiShoppingCart } from "react-icons/fi";

const Card = ({ title, value }) => {
  return (
    <div
      className="bg-[rgba(239,249,249,1)] p-4 rounded-[8px] shadow-md flex items-center space-x-4"
    >
      <div
        className="bg-[rgba(123,212,111,1)] p-3 rounded-[8px] w-17 h-17 flex justify-center items-center"  // Chỉnh lại kích thước và bỏ rounded-full
      >
        <FiShoppingCart className="text-white text-xl" />
      </div>
      <div>
        <p className="text-base">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
