import React, { useState, useEffect } from "react";
import TextInput from "../Register/TextInput";
import Select from "../Register/Select";
import { fetchCities, fetchDistricts, fetchWards } from "../../../services/locationApi";
import { getUserData } from "../../../api/userAPI";
import { parseAddress } from "../../../utils/addressParser";
import { toast } from 'react-toastify';

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

  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [locationMapping, setLocationMapping] = useState({
    cityMatch: null,
    districtMatch: null,
    wardMatch: null
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          const addressParts = parseAddress(userData.address || '');

          const fullName = userData.fullname || '';
          
          setFormData(prev => ({
            ...prev,
            fullName: userData.fullname || '',
            phone: userData.phone || '',
            email: userData.email || '',
            address: addressParts.detail || '',
          }));

          setLocationMapping({
            cityMatch: addressParts.city,
            districtMatch: addressParts.district,
            wardMatch: addressParts.ward
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Không thể tải thông tin người dùng");
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (locations.cities.length > 0 && locationMapping.cityMatch) {
      const cityOption = locations.cities.find(
        city => city.label.toLowerCase().includes(locationMapping.cityMatch.toLowerCase())
      );
      if (cityOption) {
        handleChange("city")(cityOption.value);
      }
    }
  }, [locations.cities, locationMapping.cityMatch]);

  useEffect(() => {
    if (locations.districts.length > 0 && locationMapping.districtMatch) {
      const districtOption = locations.districts.find(
        district => district.label.toLowerCase().includes(locationMapping.districtMatch.toLowerCase())
      );
      if (districtOption) {
        handleChange("district")(districtOption.value);
      }
    }
  }, [locations.districts, locationMapping.districtMatch]);

  useEffect(() => {
    if (locations.wards.length > 0 && locationMapping.wardMatch) {
      const wardOption = locations.wards.find(
        ward => ward.label.toLowerCase().includes(locationMapping.wardMatch.toLowerCase())
      );
      if (wardOption) {
        handleChange("ward")(wardOption.value);
      }
    }
  }, [locations.wards, locationMapping.wardMatch]);

  const handleChange = (name) => (value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (isLoadingUser) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Thông tin giao hàng</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TextInput
          label="Họ và tên"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName")(e.target.value)}
          required
          className="w-full"
        />

        <TextInput
          label="Số điện thoại"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone")(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <TextInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email")(e.target.value)}
        required
        className="w-full mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <Select
            label="Tỉnh/Thành phố"
            value={formData.city}
            onChange={handleChange("city")}
            options={locations.cities}
            placeholder="Chọn tỉnh/thành"
            isLoading={loading.cities}
            required
          />

          <Select
            label="Quận/Huyện"
            value={formData.district}
            onChange={handleChange("district")}
            options={locations.districts}
            placeholder="Chọn quận/huyện"
            isLoading={loading.districts}
            disabled={!formData.city}
            required
          />
        </div>

        <div className="space-y-4">
          <Select
            label="Phường/Xã"
            value={formData.ward}
            onChange={handleChange("ward")}
            options={locations.wards}
            placeholder="Chọn phường/xã"
            isLoading={loading.wards}
            disabled={!formData.district}
            required
          />

          <TextInput
            label="Địa chỉ cụ thể"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address")(e.target.value)}
            placeholder="Số nhà, tên đường..."
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <TextInput
          label="Ghi chú"
          type="textarea"
          value={formData.notes}
          onChange={(e) => handleChange("notes")(e.target.value)}
          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          className="h-24"
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
