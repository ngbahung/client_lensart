import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import { fetchCities, fetchDistricts, fetchWards } from "../../../../services/locationApi";

const CreateManager = ({ onClose, onUpdate }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  useEffect(() => {
    // Load initial cities when component mounts
    const loadCities = async () => {
      setIsLoadingLocations(true);
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Failed to load cities:", error);
        setError("Failed to load location data");
      } finally {
        setIsLoadingLocations(false);
      }
    };
    loadCities();
  }, []);

  const normalizeText = (text) => {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // Loại bỏ dấu
      .replace(/đ/g, 'd')               // Chuyển đ thành d
      .replace(/(tp\.|tp|thanh pho|tinh|huyen|thi xa|xa|phuong|thi tran)/g, '')  // Loại bỏ các tiền tố
      .trim();
  };

  const handleCityChange = async (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    
    if (cityCode) {
      try {
        const districtsData = await fetchDistricts(cityCode);
        setDistricts(districtsData);
      } catch (error) {
        console.error("Failed to load districts:", error);
      }
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard("");
    setWards([]);
    
    if (districtCode) {
      try {
        const wardsData = await fetchWards(districtCode);
        setWards(wardsData);
      } catch (error) {
        console.error("Failed to load wards:", error);
      }
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const cityLabel = cities.find(c => c.value === selectedCity)?.label || "";
    const districtLabel = districts.find(d => d.value === selectedDistrict)?.label || "";
    const wardLabel = wards.find(w => w.value === selectedWard)?.label || "";
    
    const fullAddress = `${addressDetail}, ${wardLabel}, ${districtLabel}, ${cityLabel}`.replace(/^,\s+/, '');

    try {
      const response = await axios.post('http://localhost:8000/api/users/create', {
        firstname,
        lastname,
        email,
        phone,
        password,
        address: fullAddress,
        role_id: 2 // Assuming 2 is the role_id for managers
      });

      if (response.status === 201) {
        await onUpdate();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create manager");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Create New Manager</h1>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-[#55D5D2]"
        >
          Back to List
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="firstname">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter first name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Enter last name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Address</label>
        <input
          type="text"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          placeholder="Enter street address"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            disabled={isLoadingLocations}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">District</label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            disabled={!selectedCity || isLoadingLocations}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.value} value={district.value}>{district.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">Ward</label>
          <select
            value={selectedWard}
            onChange={handleWardChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            disabled={!selectedDistrict || isLoadingLocations}
          >
            <option value="">Select Ward</option>
            {wards.map(ward => (
              <option key={ward.value} value={ward.value}>{ward.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            firstname && lastname && email && phone && password && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!firstname || !lastname || !email || !phone || !password || loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

CreateManager.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CreateManager;
