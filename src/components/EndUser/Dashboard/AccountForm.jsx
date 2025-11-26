import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../Register/TextInput";
import { FiSave, FiX, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { updateProfile } from '../../../api/userAPI';
import Swal from 'sweetalert2';

function AccountForm({ userData }) {
  const [formData, setFormData] = useState({
    firstname: userData?.firstname || '',
    lastname: userData?.lastname || '',
    phone: userData?.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const validateForm = () => {
    if (!formData.firstname.trim()) {
      toast.error('Vui lòng nhập họ');
      return false;
    }
    if (!formData.lastname.trim()) {
      toast.error('Vui lòng nhập tên');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn cập nhật thông tin?',
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
        await updateProfile(userData.id, formData);
        
        Swal.fire(
          'Thành công!',
          'Đã cập nhật thông tin tài khoản.',
          'success'
        );
        setIsDirty(false);
      } catch (error) {
        Swal.fire(
          'Lỗi!',
          'Không thể cập nhật thông tin.',
          'error'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300">
      {/* Header with gradient accent */}
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b-2 border-[#ecaa83]/30">
        <div className="p-3 bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] rounded-xl shadow-md">
          <FiUser className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Thông tin tài khoản</h2>
          <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin cá nhân của bạn</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <TextInput
            label="Email"
            name="email"
            value={userData?.email}
            disabled={true}
            className="bg-gray-100 cursor-not-allowed"
          />
          <TextInput
            type="text"
            label={<>Họ <span className="text-red-500">*</span></>}
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />

          <TextInput
            type="text"
            label={<>Tên <span className="text-red-500">*</span></>}
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />

          <TextInput
            type="tel"
            label={<>Số điện thoại <span className="text-red-500">*</span></>}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
            >
              <FiX className="w-4 h-4 mr-2" />
              Hủy
            </button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={`flex items-center shadow-md hover:shadow-lg ${!isDirty ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiSave className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
