import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../Register/TextInput";
import { FiSave, FiX, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { updateProfile } from '../../../api/userAPI';

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

    try {
      setIsSubmitting(true);
      await updateProfile(userData.id, formData);
      toast.success('Cập nhật thông tin thành công!');
      setIsDirty(false);
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4 mb-6">
        <FiUser className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Email"
          name="email"
          value={userData?.email}
          disabled={true}
          className="bg-gray-100 cursor-not-allowed"
        />
        <TextInput
          type="text"
          label="Tên *"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          label="Họ *"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <TextInput
          type="tel"
          label="Số điện thoại *"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiX className="w-4 h-4 mr-2" />
              Hủy
            </button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={`flex items-center ${!isDirty ? 'opacity-50 cursor-not-allowed' : ''}`}
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
