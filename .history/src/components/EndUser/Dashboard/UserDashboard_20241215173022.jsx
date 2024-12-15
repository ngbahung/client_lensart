import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUserData } from 
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";

function UserDashboard() {
  const [activeView, setActiveView] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        toast.error('Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen p-4">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        userData={userData}
        onLogout={logout}
      />
      {activeView === 'account' && <AccountForm userData={userData} />}
      {activeView === 'address' && <AddressForm userData={userData} />}
      {activeView === 'password' && <PasswordForm />}
    </div>
  );
}

export default UserDashboard;
