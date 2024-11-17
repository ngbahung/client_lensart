import { useState } from 'react';

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
  
    const cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];
    const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4'];
    const wards = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4'];
  
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
              placeholder="Tỉnh/Thành phố"
              value={formData.city}
              onChange={handleChange('city')}
              options={cities}
            />
  
            <Select
              placeholder="Quận/Huyện"
              value={formData.district}
              onChange={handleChange('district')}
              options={districts}
            />
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <Select
              placeholder="Phường/Xã"
              value={formData.ward}
              onChange={handleChange('ward')}
              options={wards}
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