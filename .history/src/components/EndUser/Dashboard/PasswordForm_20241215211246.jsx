import React, { useState } from 'react';
import { updatePassword } from '../../../api/userAPI';
import { getUserData } from '../../../api/userAPI';
import Swal from 'sweetalert2';
import PasswordInput from '../Register/PasswordInput';
import Button from '../Button';
import { FiLock, FiCheck, FiX } from 'react-icons/fi';

function PasswordForm() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn đổi mật khẩu?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#55d5d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        setIsSubmitting(true);
        const userData = await getUserData();
        await updatePassword(userData.id, {
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword
        });

        await Swal.fire({
          title: 'Thành công!',
          text: 'Mật khẩu đã được cập nhật.',
          icon: 'success',
          confirmButtonColor: '#55d5d2'
        });

        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        await Swal.fire({
          title: 'Lỗi!',
          text: 'Không thể cập nhật mật khẩu.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'newPassword') {
      checkPasswordStrength(value);
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <FiLock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Đổi mật khẩu</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {passwords.newPassword && (
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-700">Yêu cầu mật khẩu:</p>
            {Object.entries(passwordStrength).map(([key, valid]) => (
              <div key={key} className="flex items-center space-x-2">
                {valid ? (
                  <FiCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FiX className="w-4 h-4 text-red-500" />
                )}
                <span className={valid ? 'text-green-600' : 'text-red-600'}>
                  {key === 'length' && 'Ít nhất 8 ký tự'}
                  {key === 'number' && 'Ít nhất 1 số'}
                  {key === 'special' && 'Ít nhất 1 ký tự đặc biệt'}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 w-full flex items-center justify-center space-x-2"
        >
          {isSubmitting ? 'Đang xử lý...' : (
            <>
              <FiLock className="w-5 h-5" />
              <span>Đổi mật khẩu</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default PasswordForm;
