import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditBranch = ({ branch, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    branch_name: "",
    address: "",
    manager_id: "",  // Changed from manager_name to manager_id
    status: "",
    index: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);
  const [isLoadingManager, setIsLoadingManager] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/getByRole/2');
        if (response.data && response.data.data) {
          console.log(response.data.data);
          const activeManagers = response.data.data.filter(manager => manager.status === 'active');
          setManagers(activeManagers);

          // Find and set the current manager based on manager_name
          const currentManager = activeManagers.find(
            manager => `${manager.firstname} ${manager.lastname}` === branch.manager_name
          );

          if (currentManager) {
            setFormData(prev => ({
              ...prev,
              manager_id: currentManager.id // Set manager_id instead of manager_name
            }));
          }

          setIsLoadingManager(false);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setError("Failed to load managers list");
        setIsLoadingManager(false);
      }
    };

    fetchManagers();

    // Set initial form data
    setFormData({
      branch_name: branch.branch_name || "",
      address: branch.address || "",
      manager_id: branch.manager_id || "",  // Use manager_id
      status: branch.status || "",
      index: branch.index || ""
    });
  }, [branch]);

  const handleSave = async () => {
    // Validate required fields
    const requiredFields = {
      branch_name: "Branch Name",
      address: "Address",
      manager_id: "Manager",
      status: "Status",
      index: "Index"
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([, label]) => label);

    if (emptyFields.length > 0) {
      setError(`Please fill in the following fields: ${emptyFields.join(", ")}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:8000/api/branches/update/${branch.id}`, {
        name: formData.branch_name,
        address: formData.address,
        manager_id: Number(formData.manager_id),
        index: Number(formData.index),
        status: formData.status
      });

      if (response.status === 200) {
        const updatedBranch = {
          ...formData,
          id: branch.id
        };
        await onSubmit(branch.id, updatedBranch);
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "An error occurred while updating the branch. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        <label className="block text-gray-700 font-medium mb-2" htmlFor="branch_name">
          Branch Name
        </label>
        <input
          type="text"
          id="branch_name"
          name="branch_name"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.branch_name}
          onChange={handleChange}
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
          name="address"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter branch address"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="manager_name">
          Manager <span className="text-red-500">*</span>
        </label>
        <div className="relative w-1/2">
          <select
            id="manager"
            name="manager_id"  // Changed from manager_name to manager_id
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={formData.manager_id}
            onChange={handleChange}
          >
            <option value="">Select manager</option>
            {managers.map((manager) => (
              <option
                key={manager.id}
                value={manager.id}
              >
                {`${manager.firstname} ${manager.lastname}`}
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
            name="status"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={formData.status}
            onChange={handleChange}
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
          name="index"
          className="w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={formData.index}
          onChange={handleChange}
          placeholder="Enter index"
          min="1"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${!loading ? "bg-teal-400 text-white hover:bg-teal-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={handleSave}
          disabled={loading}
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
    branch_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    manager_name: PropTypes.string,
    index: PropTypes.number,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default EditBranch;
