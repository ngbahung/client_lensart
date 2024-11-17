import { useState } from 'react';
import Input from './TextInput';
import PasswordInput from './PasswordInput';
import Select from './Select';
import { fetchCities, fetchDistricts, fetchWards } from '../services/locationApi';

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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };
  
    const handleChange = (field) => (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: typeof e === 'string' ? e : e.target.value
      }));
    };
  
    return (
      <div className="max-w-md w-full mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Đăng ký tài khoản</h2>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange('email')}
          />
  
          <PasswordInput
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange('password')}
          />
  
          <PasswordInput
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
  
          <div className="grid grid-cols-2 gap-4">
            <Select
                label="Tỉnh/Thành phố"
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
          </div>
  
          <div className="grid grid-cols-2 gap-4">
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
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-teal-400 text-white py-3 rounded-full hover:bg-teal-500 transition-colors mt-4"
          >
            Đăng ký
          </button>
        </form>
      </div>
    );
  };
  
  export default RegistrationForm;