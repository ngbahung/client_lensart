import React, { useState } from 'react';
import PasswordInput from '../Register/PasswordInput';
import Button from '../Button';
import { FiLock } from 'react-icons/fi';

function PasswordForm() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!passwords.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!passwords.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement API call to change password
      console.log('Password change data:', passwords);
    }
  };

  const handleChange = (field) => (e) => {
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded shadow">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu hiện tại
          </label>
          <PasswordInput
            placeholder="Nhập mật khẩu hiện tại"
            value={passwords.currentPassword}
            onChange={(e) => handleChange('currentPassword')(e)}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu mới
          </label>
          <PasswordInput
            placeholder="Nhập mật khẩu mới"
            value={passwords.newPassword}
            onChange={(e) => handleChange('newPassword')(e)}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Xác nhận mật khẩu mới
            </label>
          <PasswordInput
            placeholder="Nhập lại mật khẩu mới"
            value={passwords.confirmPassword}
            onChange={(e) => handleChange('confirmPassword')(e)}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div> 

        <Button 
          type="submit" 
          className="mt-6 w-full md:w-auto flex items-center justify-center space-x-2"
        >
          <FiLock className="w-5 h-5" />
          <span>Đổi mật khẩu</span>
        </Button>
      </form>
    </div>
  );
}

export default PasswordForm;
