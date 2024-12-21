import React, { useState } from "react";

const ToggleSwitch = ({ initialStatus = 'inactive', onChange }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleSwitch = () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    setStatus(newStatus);
    onChange?.(newStatus);
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id="toggle-switch"
        checked={status === 'active'}
        onChange={toggleSwitch}
        className="sr-only"
      />
      <label
        htmlFor="toggle-switch"
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

export default ToggleSwitch;
