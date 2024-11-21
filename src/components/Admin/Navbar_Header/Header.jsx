import React, { useState, useEffect } from "react";

const Header = () => {
  const [dateTime, setDateTime] = useState("");
  const user = {
    name: "Hiếu",
    avatar: "https://cdn.tuoitre.vn/zoom/700_525/471584752817336320/2024/8/1/loopy-02-1722510337621638910331-72-0-596-1000-crop-1722510365891115014227.jpg", // URL ảnh hợp lệ để test
  };

  const updateDateTime = () => {
    const now = new Date();
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    const formattedDateTime = `${now
      .toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      .replace(":", ":")}, ${daysOfWeek[now.getDay()]}, ${now
      .toLocaleDateString("vi-VN")
      .replaceAll("/", "/")}`;

    setDateTime(formattedDateTime);
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 bg-[rgba(85,213,210,1)] flex items-center justify-between px-6 fixed w-[83%] z-10">
      <div className="text-[rgba(255,255,255,1)] text-[16px]">{dateTime}</div>
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="text-[rgba(255,255,255,1)] text-[16px]">
          Hi, {user.name}
        </div>
      </div>
    </div>
  );
};

export default Header;
