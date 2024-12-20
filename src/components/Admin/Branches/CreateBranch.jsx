import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

const CreateBranch = ({ onClose }) => {
  const [formData, setFormData] = useState({
    branch_name: "",
    address: "",
    manager_id: "",
    index: ""
  });
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/getByRole/2');
        if (response.data && response.data.data) {
          // Filter only active managers
          const activeManagers = response.data.data.filter(manager => manager.status === 'active');
          setManagers(activeManagers);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setError("Failed to load managers list");
      }
    };
    
    fetchManagers();
  }, []);

  const handleSave = async () => {
    if (!formData.branch_name.trim() || !formData.address.trim() || 
        !formData.manager_id || !formData.index) {
      setError("Please fill in all fields.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/branches/create', {
        name: formData.branch_name.trim(),
        address: formData.address.trim(),
        manager_id: Number(formData.manager_id),
        index: Number(formData.index)
      });
      
      if (response.data) {
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">Create Branch</h1>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-[#55D5D2]"
          >
            Back to List
          </button>
        </div>
        <hr className="border-gray-200" />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.branch_name}
          onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
          placeholder="Enter branch name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter branch address"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="manager">
          Manager <span className="text-red-500">*</span>
        </label>
        <div className="relative w-1/2">
          <select
            id="manager"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={formData.manager_id}
            onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
          >
            <option value="">Select manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {`${manager.firstname} ${manager.lastname}`}
              </option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="index">
          Index <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="index"
          className="w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.index}
          onChange={(e) => setFormData({ ...formData, index: e.target.value })}
          placeholder="Enter index"
          min="1"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            formData.branch_name.trim() && formData.address.trim() && formData.manager_id && formData.index && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!formData.branch_name.trim() || !formData.address.trim() || !formData.manager_id || !formData.index || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreateBranch;
