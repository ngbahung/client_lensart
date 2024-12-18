import React, { useState, useEffect } from 'react';
import TextInput from '../Register/TextInput';
import Button from '../Button';
import { fetchCities, fetchDistricts, fetchWards } from '../../../services/locationApi';
import { getUserData } from '../../../api/userAPI';
import { parseAddress } from '../../../utils/addressParser';
import { toast } from 'react-toastify';
import { updateAddress } from '../../../api/userAPI';

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

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setLoading(true);
        // Load cities first
        const cities = await fetchCities();
        setLocations(prev => ({ ...prev, cities }));

        // Get user data
        const userData = await getUserData();
        if (!userData?.address) return;

        // Parse address string
        const { detail, ward, district, city } = parseAddress(userData.address);

        // Find city code
        const cityMatch = cities.find(c => city.includes(c.label));
        if (!cityMatch) return;

        // Load and set districts
        const districts = await fetchDistricts(cityMatch.value);
        setLocations(prev => ({ ...prev, districts }));

        // Find district code
        const districtMatch = districts.find(d => district.includes(d.label));
        if (!districtMatch) return;

        // Load and set wards
        const wards = await fetchWards(districtMatch.value);
        setLocations(prev => ({ ...prev, wards }));

        // Find ward code and set full address
        const wardMatch = wards.find(w => ward.includes(w.label));
        
        setAddress({
          detail,
          cityCode: cityMatch.value,
          districtCode: districtMatch.value,
          wardCode: wardMatch?.value || ''
        });

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
    } else {
      setLocations(prev => ({ ...prev, wards: [] }));
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
    if (!districtCode) return;
    
    try {
      setLoading(true);
      const wards = await fetchWards(districtCode);
      setLocations(prev => ({ ...prev, wards }));
    } catch (error) {
      console.error('Error loading wards:', error);
      toast.error('Không thể tải danh sách phường/xã');
      setLocations(prev => ({ ...prev, wards: [] }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.cityCode || !address.districtCode || !address.wardCode || !address.detail.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    toast.info(
      'Bạn có chắc chắn muốn cập nhật địa chỉ?', 
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        buttons: [
          {
            label: 'Có',
            onClick: async () => {
              try {
                setIsSubmitting(true);
                const cityName = locations.cities.find(city => city.value === address.cityCode)?.label;
                const districtName = locations.districts.find(district => district.value === address.districtCode)?.label;
                const wardName = locations.wards.find(ward => ward.value === address.wardCode)?.label;

                const formattedAddress = `${address.detail}, ${wardName}, ${districtName}, ${cityName}`;
                const userData = await getUserData();
                
                await updateAddress(userData.id, formattedAddress);
                toast.success('Cập nhật địa chỉ thành công');
              } catch (error) {
                toast.error('Không thể cập nhật địa chỉ. Vui lòng thử lại sau.');
              } finally {
                setIsSubmitting(false);
              }
            }
          },
          {
            label: 'Không',
            onClick: () => toast.dismiss()
          }
        ]
      }
    );
  };

  if (loading) {
    return (
      <div className="flex-1 ml-8 bg-white p-6 rounded shadow animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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

        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang lưu...' : 'Lưu thông tin'}
        </Button>
      </form>
    </div>
  );
}

export default AddressForm;