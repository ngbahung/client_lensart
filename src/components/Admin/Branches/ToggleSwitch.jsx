import React from "react";

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id="toggle-switch"
        checked={isChecked === 'active'}
        onChange={onChange}
        className="sr-only"
      />
      <label
        htmlFor="toggle-switch"
        className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors ${
          isChecked === 'active' ? "bg-[#55d5d2]" : "bg-gray-400"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isChecked === 'active' ? "translate-x-9" : "translate-x-1"
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
