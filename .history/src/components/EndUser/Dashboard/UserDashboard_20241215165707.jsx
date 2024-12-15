import React from "react";
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";

function UserDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen p-4">
      <Sidebar />
      <AccountForm />
    </div>
  );
}

export default UserDashboard;
