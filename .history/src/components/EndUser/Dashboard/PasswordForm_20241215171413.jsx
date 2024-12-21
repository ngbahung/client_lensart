import React, { useState } from 'react';
import TextInput from '../Register/TextInput';
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

    if (passwords.newPassword !== passwords.confirmPassword) {
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
    <div className="flex-1 ml-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <TextInput
          type="password"
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          value={passwords.currentPassword}
          onChange={handleChange('currentPassword')}
          error={errors.currentPassword}
          icon={FiLock}
        />

        <TextInput
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          value={passwords.newPassword}
          onChange={handleChange('newPassword')}
          error={errors.newPassword}
          icon={FiLock}
        />

        <TextInput
          type="password"
          label="Xác nhận mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          value={passwords.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          icon={FiLock}
        />

        <Button type="submit" className="mt-6">
          Đổi mật khẩu
        </Button>
      </form>
    </div>
  );
}

export default PasswordForm;
