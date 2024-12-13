import React, { useState, useEffect } from "react";
import TextInput from "../Register/TextInput";
import Select from "../Register/Select";
import { fetchCities, fetchDistricts, fetchWards } from "../../../services/locationApi";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    notes: "",
  });

  const [locations, setLocations] = useState({
    cities: [],
    districts: [],
    wards: [],
  });

  const [loading, setLoading] = useState({
    cities: false,
    districts: false,
    wards: false,
  });

  useEffect(() => {
    const loadCities = async () => {
      setLoading(prev => ({ ...prev, cities: true }));
      try {
        const cities = await fetchCities();
        setLocations(prev => ({ ...prev, cities }));
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
      setLoading(prev => ({ ...prev, cities: false }));
    };
    loadCities();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!formData.city) {
        setLocations(prev => ({ ...prev, districts: [], wards: [] }));
        setFormData(prev => ({ ...prev, district: "", ward: "" }));
        return;
      }
      
      setLoading(prev => ({ ...prev, districts: true }));
      try {
        const districts = await fetchDistricts(formData.city);
        setLocations(prev => ({ ...prev, districts }));
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
      setLoading(prev => ({ ...prev, districts: false }));
    };
    loadDistricts();
  }, [formData.city]);

  useEffect(() => {
    const loadWards = async () => {
      if (!formData.district) {
        setLocations(prev => ({ ...prev, wards: [] }));
        setFormData(prev => ({ ...prev, ward: "" }));
        return;
      }

      setLoading(prev => ({ ...prev, wards: true }));
      try {
        const wards = await fetchWards(formData.district);
        setLocations(prev => ({ ...prev, wards }));
      } catch (error) {
        console.error("Failed to fetch wards:", error);
      }
      setLoading(prev => ({ ...prev, wards: false }));
    };
    loadWards();
  }, [formData.district]);

  const handleChange = (name) => (value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout Form</h2>

        <TextInput
          label="Họ và tên"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName")(e.target.value)}
        />

        <TextInput
          label="Số điện thoại"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone")(e.target.value)}
        />

        <TextInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email")(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <Select
            value={formData.city}
            onChange={handleChange("city")}
            options={locations.cities}
            placeholder="Chọn tỉnh/thành"
            isLoading={loading.cities}
          />

          <Select
            value={formData.district}
            onChange={handleChange("district")}
            options={locations.districts}
            placeholder="Chọn quận/huyện"
            isLoading={loading.districts}
            disabled={!formData.city}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select
            value={formData.ward}
            onChange={handleChange("ward")}
            options={locations.wards}
            placeholder="Chọn phường/xã"
            isLoading={loading.wards}
            disabled={!formData.district}
          />

          <TextInput
            label="Địa chỉ"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address")(e.target.value)}
          />
        </div>

        <TextInput
          label="Ghi chú"
          type="text"
          value={formData.notes}
          onChange={(e) => handleChange("notes")(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
