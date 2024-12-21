import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { fetchCities, fetchDistricts, fetchWards } from "../../../../services/locationApi";

const CreateCustomer = ({ onClose, onUpdate }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active"); // Default status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Location states
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // Load cities when component mounts
  React.useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Failed to load cities:", error);
        setError("Failed to load cities");
      }
    };
    loadCities();
  }, []);

  // Handle location changes
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

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !phone.trim()) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Phone validation (simple example)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        setError("Please enter a valid 10-digit phone number");
        setLoading(false);
        return;
      }

      const cityLabel = cities.find(c => c.value === selectedCity)?.label || "";
      const districtLabel = districts.find(d => d.value === selectedDistrict)?.label || "";
      const wardLabel = wards.find(w => w.value === selectedWard)?.label || "";
      
      const fullAddress = `${addressDetail}, ${wardLabel}, ${districtLabel}, ${cityLabel}`.replace(/^,\s+/, '');

      const userData = {
        firstname: firstname.trim(),    // Changed back to firstname
        lastname: lastname.trim(),      // Changed back to lastname
        email: email.trim(),
        password: password,
        phone: phone.trim(),           // Changed back to phone
        address: fullAddress,
        role_id: 3
      };

      console.log('Sending data:', userData); // For debugging

      const response = await axios.post('http://localhost:8000/api/users/create', userData);

      if (response.status === 201) {
        await onUpdate(); // Gọi hàm update từ props
        onClose(); // Đóng form
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Create Customer</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-[#55D5D2]">
          Back to List
        </button>
      </div>

      {/* First Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">First Name</label>
        <input
          type="text"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter first name"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Last Name</label>
        <input
          type="text"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Enter last name"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative w-1/2">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Phone</label>
        <input
          type="text"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      {/* Address Detail */}
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

      {/* Location Dropdowns */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* City Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* District Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">District</label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            disabled={!selectedCity}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.value} value={district.value}>{district.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Ward Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">Ward</label>
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            disabled={!selectedDistrict}
          >
            <option value="">Select Ward</option>
            {wards.map(ward => (
              <option key={ward.value} value={ward.value}>{ward.label}</option>
            ))}
          </select>
          <FaAngleDown className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4 whitespace-pre-line">
          {error}
        </div>
      )}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${
            firstname && lastname && email && password && phone && addressDetail && selectedCity && selectedDistrict && selectedWard && !loading
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!firstname || !lastname || !email || !password || !phone || !addressDetail || !selectedCity || !selectedDistrict || !selectedWard || loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateCustomer;
