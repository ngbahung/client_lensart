import React, { useState, useEffect } from 'react';
import TextInput from '../Register/TextInput';
import Button from '../Button';
import { fetchCities, fetchDistricts, fetchWards } from '../../../services/locationApi';

function AddressForm() {
  const [address, setAddress] = useState({
    detail: '',
    cityCode: '',
    districtCode: '',
    wardCode: ''
  });

  const [locations, setLocations] = useState({
    cities: [],
    districts: [],
    wards: []
  });

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setLoading(true);
        // Fetch user data and cities simultaneously
        const [userData, citiesData] = await Promise.all([
          getUserData(),
          fetchCities()
        ]);
        
        const { detail, ward, district, city } = parseAddress(userData.address);
        
        // Find matching codes
        const cityCode = citiesData.find(c => c.name === city)?.code || '';
        
        setAddress(prev => ({
          ...prev,
          detail,
          cityCode
        }));

        if (cityCode) {
          const districts = await fetchDistricts(cityCode);
          const districtCode = districts.find(d => d.name === district)?.code || '';
          
          setAddress(prev => ({
            ...prev,
            districtCode
          }));

          if (districtCode) {
            const wards = await fetchWards(districtCode);
            const wardCode = wards.find(w => w.name === ward)?.code || '';
            
            setAddress(prev => ({
              ...prev,
              wardCode
            }));
          }
        }
      } catch (error) {
        toast.error('Không thể tải thông tin địa chỉ');
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, []);

  useEffect(() => {
    if (address.cityCode) {
      loadDistricts(address.cityCode);
      setAddress(prev => ({ ...prev, districtCode: '', wardCode: '' }));
    }
  }, [address.cityCode]);

  useEffect(() => {
    if (address.districtCode) {
      loadWards(address.districtCode);
      setAddress(prev => ({ ...prev, wardCode: '' }));
    }
  }, [address.districtCode]);

  const loadCities = async () => {
    try {
      const cities = await fetchCities();
      setLocations(prev => ({ ...prev, cities }));
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const loadDistricts = async (cityCode) => {
    try {
      const districts = await fetchDistricts(cityCode);
      setLocations(prev => ({ ...prev, districts }));
    } catch (error) {
      console.error('Error loading districts:', error);
    }
  };

  const loadWards = async (districtCode) => {
    try {
      const wards = await fetchWards(districtCode);
      setLocations(prev => ({ ...prev, wards }));
    } catch (error) {
      console.error('Error loading wards:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Address data:', address);
    // TODO: Implement API call to save address
  };

  return (
    <div className="flex-1 ml-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Thông tin địa chỉ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full px-4 py-3 rounded-full bg-[#eff9f9] border border-[#E8F0FE]"
          value={address.cityCode}
          onChange={(e) => setAddress(prev => ({ ...prev, cityCode: e.target.value }))}
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
          {locations.cities.map(city => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
        </select>

        <select
          className="w-full px-4 py-3 rounded-full bg-[#eff9f9] border border-[#E8F0FE]"
          value={address.districtCode}
          onChange={(e) => setAddress(prev => ({ ...prev, districtCode: e.target.value }))}
        >
          <option value="">Chọn Quận/Huyện</option>
          {locations.districts.map(district => (
            <option key={district.value} value={district.value}>{district.label}</option>
          ))}
        </select>

        <select
          className="w-full px-4 py-3 rounded-full bg-[#eff9f9] border border-[#E8F0FE]"
          value={address.wardCode}
          onChange={(e) => setAddress(prev => ({ ...prev, wardCode: e.target.value }))}
        >
          <option value="">Chọn Phường/Xã</option>
          {locations.wards.map(ward => (
            <option key={ward.value} value={ward.value}>{ward.label}</option>
          ))}
        </select>

        <TextInput
          type="text"
          label="Địa chỉ chi tiết"
          placeholder="Nhập địa chỉ chi tiết"
          value={address.detail}
          onChange={(e) => setAddress(prev => ({ ...prev, detail: e.target.value }))}
        />

        <Button type="submit">Lưu thông tin</Button>
      </form>
    </div>
  );
}

export default AddressForm;
