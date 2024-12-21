import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUserData } from '../../../api/userAPI';
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";

function UserDashboard() {
  const [activeView, setActiveView] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-20 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'block' : 'hidden'} 
        md:block fixed md:relative w-full md:w-auto z-10
      `}>
        <Sidebar 
          activeView={activeView} 
          onViewChange={(view) => {
            setActiveView(view);
            setSidebarOpen(false);
          }}
          userData={userData}
          onLogout={logout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 mt-16 md:mt-0">
        {activeView === 'account' && <AccountForm userData={userData} />}
        {activeView === 'address' && <AddressForm userData={userData} />}
        {activeView === 'password' && <PasswordForm />}
      </div>
    </div>
  );
}

export default UserDashboard;
