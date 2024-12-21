import React, { useState } from "react";
import Button from "./Button";

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
        {/* First Name */}
        <div>
          <label className="block font-medium">Tên *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Họ *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Địa chỉ email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Số điện thoại *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button text="Hủy" onClick={handleCancel} color="orange" />
          <Button text="Lưu thay đổi" onClick={handleSave} color="blue" />
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
