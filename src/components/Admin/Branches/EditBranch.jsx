import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditBranch = ({ branch, onClose }) => { // Bỏ prop refreshBranches
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingManager, setIsLoadingManager] = useState(true);
  const [managers, setManagers] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [index, setIndex] = useState("");

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/getByRole/2');
        if (response.data && response.data.users) {
          // Filter only active managers
          const activeManagers = response.data.users.filter(manager => manager.status === 'active');
          setManagers(activeManagers);
          
          // Check if current branch manager exists in active managers list
          const managerExists = activeManagers.some(manager => manager.id === branch.manager_id);
          
          // If manager exists in active list, set it as selected, otherwise reset to empty
          setSelectedManagerId(managerExists ? branch.manager_id : '');
          
          // Set loading state to false after fetching
          setIsLoadingManager(false);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setError("Failed to load managers list");
        setIsLoadingManager(false);
      }
    };
    
    fetchManagers();
  }, [branch.manager_id]);

  useEffect(() => {
    if (branch) {
      setName(branch.name);
      setAddress(branch.address);
      setStatus(branch.status); // Status is now directly used as 'active' or 'inactive'
      setIndex(branch.index || "");
    }
  }, [branch]);

  const handleSave = async () => {
    if (!name.trim() || !address.trim() || !status || !selectedManagerId || !index) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:8000/api/branches/update/${branch.id}`, {
        name: name,
        address: address,
        manager_id: selectedManagerId,
        index: Number(index),  // Always send index as number
        status: status
      });

      if (response.status === 200) {
        onClose(); // Sẽ trigger onUpdate thông qua Table component
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">Edit Branch</h1>
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
        <label className="block text-gray-700 font-medium mb-2" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className="w-1/2 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
          value={branch.id}
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
            value={selectedManagerId || ""}
            onChange={(e) => setSelectedManagerId(Number(e.target.value) || '')}
          >
            <option value="">Select manager</option>
            {managers.map((manager) => (
              <option 
                key={manager.id} 
                value={manager.id}
              >
                {`${manager.firstName} ${manager.lastName}`}
              </option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
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

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="index">
          Index <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="index"
          className="w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder="Enter index"
          min="1"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            name.trim() && address.trim() && status && selectedManagerId && index && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!name.trim() || !address.trim() || !status || !selectedManagerId || !index || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

EditBranch.propTypes = {
  branch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    manager_id: PropTypes.number,
    index: PropTypes.number,
    status: PropTypes.string.isRequired, // Changed to string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  // Bỏ refreshBranches từ PropTypes
};

export default EditBranch;
