import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CreateShape = ({ onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter shape name.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/shapes/create', {
        name: name.trim()
      });
      
      console.log("Shape saved:", response.data);
      alert("Shape saved successfully!");
      await onUpdate();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save shape");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Create Shape</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter shape name"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            name.trim() && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!name.trim() || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

CreateShape.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CreateShape;
