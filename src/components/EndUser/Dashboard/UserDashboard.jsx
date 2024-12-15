import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUserData } from '../../../api/userAPI';
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";
import OrdersTable from "./OrdersTable";
import FavoritesTable from "./FavoritesTable";
import { FiMenu, FiLoader } from 'react-icons/fi';

function UserDashboard() {
  const [activeView, setActiveView] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock orders data
  const mockOrders = [
    { id: '1', quantity: 2, status: 'pending', createdAt: '2024-01-15', total: 500000 },
    { id: '2', quantity: 1, status: 'delivered', createdAt: '2024-01-10', total: 750000 },
    { id: '3', quantity: 3, status: 'shipping', createdAt: '2024-01-05', total: 1200000 },
  ];

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-20 p-2 rounded-md bg-white shadow-md md:hidden"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      <div className="flex p-4 md:p-6 lg:p-8">
        {/* Sidebar wrapper with smooth transition */}
        <div className={`
          fixed md:relative md:block z-10 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
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

        {/* Overlay with fade effect */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area with transition */}
        <div className="flex-1 transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            {activeView === 'account' && <AccountForm userData={userData} />}
            {activeView === 'address' && <AddressForm userData={userData} />}
            {activeView === 'password' && <PasswordForm />}
            {activeView === 'orders' && <OrdersTable orders={mockOrders} />}
            {activeView === 'favorites' && <FavoritesTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
