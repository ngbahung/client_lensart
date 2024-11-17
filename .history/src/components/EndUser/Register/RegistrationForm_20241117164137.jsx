import React, { useState, useEffect } from 'react';
import Input from './TextInput';
import PasswordInput from './PasswordInput';
import Select from './Select';
import { fetchCities, fetchDistricts, fetchWards } from '../../../services/locationApi';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    ward: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    submitError: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [locations, setLocations] = useState({
    cities: [],
    districts: [],
    wards: []
  });

  const [loading, setLoading] = useState({
    cities: false,
    districts: false,
    wards: false
  });

  const [error, setError] = useState(null);

  // Fetch cities on component mount
  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(prev => ({ ...prev, cities: true }));
        const citiesData = await fetchCities();
        setLocations(prev => ({ ...prev, cities: citiesData }));
      } catch (err) {
        setError('Failed to load cities');
        console.error(err);
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };
    loadCities();
  }, []);

  // Fetch districts when city changes
  useEffect(() => {
    if (!formData.city) {
      setLocations(prev => ({ ...prev, districts: [], wards: [] }));
      return;
    }

    const loadDistricts = async () => {
      try {
        setLoading(prev => ({ ...prev, districts: true }));
        const districtsData = await fetchDistricts(formData.city);
        setLocations(prev => ({ ...prev, districts: districtsData }));
        setFormData(prev => ({ ...prev, district: '', ward: '' }));
      } catch (err) {
        setError('Failed to load districts');
        console.error(err);
      } finally {
        setLoading(prev => ({ ...prev, districts: false }));
      }
    };
    loadDistricts();
  }, [formData.city]);

  // Fetch wards when district changes
  useEffect(() => {
    if (!formData.district) {
      setLocations(prev => ({ ...prev, wards: [] }));
      return;
    }

    const loadWards = async () => {
      try {
        setLoading(prev => ({ ...prev, wards: true }));
        const wardsData = await fetchWards(formData.district);
        setLocations(prev => ({ ...prev, wards: wardsData }));
        setFormData(prev => ({ ...prev, ward: '' }));
      } catch (err) {
        setError('Failed to load wards');
        console.error(err);
      } finally {
        setLoading(prev => ({ ...prev, wards: false }));
      }
    };
    loadWards();
  }, [formData.district]);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Location validation
    if (!formData.city || !formData.district || !formData.ward || !formData.address) {
      newErrors.address = 'Vui lòng điền đầy đủ thông tin địa chỉ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Add your API call here
      console.log('Form submitted:', formData);
      // Redirect or show success message
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submitError: 'Đăng ký thất bại. Vui lòng thử lại.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    // Handle both direct value passing and event objects
    const value = e?.target ? e.target.value : e;
    setErrors(prev => ({ ...prev, [field]: '', submitError: '' }));
    
    // Reset child locations when parent location changes
    if (field === 'city') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        district: '',
        ward: ''
      }));
    } else if (field === 'district') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        ward: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 align-">Đăng ký tài khoản</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        <PasswordInput
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        <PasswordInput
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

        <Select
          label="Thành phố"
          value={formData.city}
          onChange={handleChange('city')}
          options={locations.cities}
          isLoading={loading.cities}
          placeholder="Chọn thành phố"
        />

        <Select
          label="Quận/Huyện"
          value={formData.district}
          onChange={handleChange('district')}
          options={locations.districts}
          isLoading={loading.districts}
          disabled={!formData.city}
          placeholder="Chọn quận/huyện"
        />

        <Select
          label="Phường/Xã"
          value={formData.ward}
          onChange={handleChange('ward')}
          options={locations.wards}
          isLoading={loading.wards}
          disabled={!formData.district}
          placeholder="Chọn phường/xã"
        />

        <Input
          type="text"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange('address')}
          error={errors.address}
        />

        {errors.submitError && (
          <div className="text-red-500 text-sm">{errors.submitError}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-teal-400 text-white py-3 rounded-full transition-colors mt-4
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500'}`}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;