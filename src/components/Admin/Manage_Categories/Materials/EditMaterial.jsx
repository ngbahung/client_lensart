import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditMaterial = ({ material, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) {
      setName(material.name);
      setStatus(material.status); // status is already 'active' or 'inactive'
    }
  }, [material]);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:8000/api/materials/update/${material.id}`, {
        name: name,
        status: status // status is already 'active' or 'inactive' from select
      });

      if (response.status === 200) {
        const success = await onUpdate();
        if (success) {
          onClose();
        } else {
          throw new Error("Failed to refresh materials list");
        }
      } else {
        throw new Error(response.data?.message || "Failed to update material");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to update material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Edit Material</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className="w-1/2 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
          value={material.id}
          disabled
          readOnly
        />
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
          placeholder="Enter material name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
          Status
        </label>
        <div className="relative w-1/4">
          <select
            id="status"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            name.trim() && status && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!name.trim() || !status || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

EditMaterial.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditMaterial;
