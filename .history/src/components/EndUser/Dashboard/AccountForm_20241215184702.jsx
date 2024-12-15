import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../Register/TextInput";

function AccountForm({ userData }) {
  const [formData, setFormData] = useState({
    firstname: userData?.firstname || '',
    lastname: userData?.lastname || '',
    phone: userData?.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserProfile(formData);
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cập nhật thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="flex-1 bg-white p-6 ml-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>
      <form onSubmit={handleSave} className="space-y-4">
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

        <div className="flex items-center gap-4">
          <Button
            onClick={handleCancel}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Hủy
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;