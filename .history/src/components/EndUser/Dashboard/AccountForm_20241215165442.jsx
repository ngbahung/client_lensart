import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../Register/TextInput";

function AccountForm() {
  const [formData, setFormData] = useState({
    firstName: "Phương",
    lastName: "Tạ Việt",
    email: "phuongtv@uit.edu.vn",
    phone: "0123456789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    alert("Thông tin đã được lưu!");
    console.log(formData);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="flex-1 bg-white p-6 ml-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>
      <form className="space-y-4">
        <TextInput
          type="text"
          label="Tên *"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          label="Họ *"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <TextInput
          type="email"
          label="Địa chỉ email *"
          name="email"
          value={formData.email}
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
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
