import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../api/authAPI';
import Input from './TextInput';
import PasswordInput from './PasswordInput';
import Select from './Select';
import { fetchCities, fetchDistricts, fetchWards } from '../../../services/locationApi';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    ward: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    phone: '',
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

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Check for valid domain extension (at least 2 characters)
    const parts = email.split('@');
    const domain = parts[1];
    if (!domain || domain.split('.')[1]?.length < 2) return false;
    
    // Check length constraints
    if (email.length < 5 || email.length > 254) return false;
    
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstname.trim()) newErrors.firstname = 'Vui lòng nhập họ';
    if (!formData.lastname.trim()) newErrors.lastname = 'Vui lòng nhập tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!formData.email) newErrors.email = 'Vui lòng nhập email';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Email không hợp lệ. Vui lòng kiểm tra lại định dạng email';
    if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    if (!formData.city) newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
    if (!formData.district) newErrors.district = 'Vui lòng chọn quận/huyện';
    if (!formData.ward) newErrors.ward = 'Vui lòng chọn phường/xã';
    if (!formData.address) newErrors.address = 'Vui lòng nhập địa chỉ cụ thể';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin đăng ký');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullAddress = [
        formData.address,
        formData.ward && locations.wards.find(w => w.value === formData.ward)?.label,
        formData.district && locations.districts.find(d => d.value === formData.district)?.label,
        formData.city && locations.cities.find(c => c.value === formData.city)?.label
      ].filter(Boolean).join(', ');

      await register({
        ...formData,
        address: fullAddress
      });

      toast.success('Đăng ký thành công! Vui lòng xác thực email.');
      navigate('/verify-otp', { 
        state: { 
          email: formData.email,
          message: 'Vui lòng kiểm tra email của bạn để lấy mã xác thực'
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
      setErrors({
        ...errors,
        submitError: error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      });
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
    <div className="max-w-md w-full mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Họ"
                    value={formData.firstname}
                    onChange={(e) => handleChange('firstname')(e)}
                    error={errors.firstname}
                />
                <Input
                    label="Tên"
                    value={formData.lastname}
                    onChange={(e) => handleChange('lastname')(e)}
                    error={errors.lastname}
                />
            </div>

            <Input
                label="Số điện thoại"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone')(e)}
                error={errors.phone}
            />

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