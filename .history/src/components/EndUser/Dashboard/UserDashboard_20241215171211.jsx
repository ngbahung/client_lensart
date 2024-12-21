import React, { useState } from "react";
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";

function UserDashboard() {
  const [activeView, setActiveView] = useState('account');

  return (
    <div className="flex bg-gray-100 min-h-screen p-4">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'account' && <AccountForm />}
      {activeView === 'address' && <AddressForm />}
    </div>
  );
}

export default UserDashboard;
