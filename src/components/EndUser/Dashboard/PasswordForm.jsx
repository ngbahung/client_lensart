import React, { useState } from 'react';
import { updatePassword } from '../../../api/userAPI';
import { getUserData } from '../../../api/userAPI';
import Swal from 'sweetalert2';
import PasswordInput from '../Register/PasswordInput';
import Button from '../Button';
import { FiLock, FiCheck, FiX } from 'react-icons/fi';

function PasswordForm() {
  const [passwords, setPasswords] = useState({
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
          password: passwords.newPassword
        });

        await Swal.fire({
          title: 'Thành công!',
          text: 'Mật khẩu đã được cập nhật.',
          icon: 'success',
          confirmButtonColor: '#55d5d2'
        });

        setPasswords({
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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto transition-all duration-300">
      {/* Header with gradient accent */}
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
        <div className="p-3 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-xl shadow-md">
          <FiLock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h2>
          <p className="text-sm text-gray-500 mt-1">Cập nhật mật khẩu để bảo mật tài khoản</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            placeholder="Nhập mật khẩu mới"
            value={passwords.newPassword}
            onChange={(e) => handleChange('newPassword')(e)}
          />
          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <FiX className="w-4 h-4 mr-1" />
              {errors.newPassword}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            placeholder="Nhập lại mật khẩu mới"
            value={passwords.confirmPassword}
            onChange={(e) => handleChange('confirmPassword')(e)}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <FiX className="w-4 h-4 mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div> 

        {passwords.newPassword && (
          <div className="bg-gradient-to-br from-[#eff9f9] to-white p-5 rounded-xl border border-[#6fd4d2]/20 space-y-3">
            <p className="font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-5 bg-gradient-to-b from-[#6fd4d2] to-[#55d5d2] rounded-full mr-2"></span>
              Yêu cầu mật khẩu:
            </p>
            {Object.entries(passwordStrength).map(([key, valid]) => (
              <div key={key} className="flex items-center space-x-3 group">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  valid ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {valid ? (
                    <FiCheck className="w-3 h-3 text-white" />
                  ) : (
                    <FiX className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  valid ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {key === 'length' && 'Ít nhất 8 ký tự'}
                  {key === 'number' && 'Ít nhất 1 số'}
                  {key === 'special' && 'Ít nhất 1 ký tự đặc biệt (!@#$%^&*)'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <FiLock className="w-5 h-5" />
                <span>Đổi mật khẩu</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordForm;
