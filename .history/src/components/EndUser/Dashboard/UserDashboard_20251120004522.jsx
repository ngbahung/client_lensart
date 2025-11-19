import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
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
import OrderDetail from "./OrderDetail";

function UserDashboard() {
  const location = useLocation();
  const [activeView, setActiveView] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Mock orders data
  const mockOrders = [
    { id: '1', quantity: 2, status: 'pending', createdAt: '2024-01-15', total: 500000 },
    { id: '2', quantity: 1, status: 'delivered', createdAt: '2024-01-10', total: 750000 },
    { id: '3', quantity: 3, status: 'shipping', createdAt: '2024-01-05', total: 1200000 },
  ];

  // Handle URL query parameters for view switching
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    if (view && ['account', 'address', 'orders', 'favorites', 'password'].includes(view)) {
      setActiveView(view);
    }
  }, [location.search]);

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
      <div className="min-h-screen bg-gradient-to-br from-[#eff9f9] via-white to-[#eff9f9] flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl shadow-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#6fd4d2] border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-[#F5A97F] border-t-transparent animate-spin animation-delay-150" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-gray-700 font-medium">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff9f9] via-white to-[#eff9f9]">
      {/* Mobile menu button with enhanced styling */}
      <button
        className="fixed top-20 right-4 z-30 p-3 rounded-xl bg-gradient-to-br from-[#6fd4d2] to-[#55d5d2] text-white shadow-lg hover:shadow-xl transition-all duration-200 md:hidden active:scale-95"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      <div className="flex flex-col md:flex-row p-4 md:p-6 lg:p-8 relative pt-16 md:pt-4 gap-6">
        {/* Sidebar wrapper with enhanced positioning */}
        <div 
          className={`
            fixed top-16 inset-y-0 left-0 z-20 w-80 md:w-auto md:static md:top-auto
            transform transition-all duration-300 ease-in-out h-[calc(100vh-4rem)]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
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

        {/* Enhanced backdrop overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 top-16 bg-black bg-opacity-50 backdrop-blur-sm z-10 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area with improved layout */}
        <div className={`
          flex-1 transition-all duration-300 mt-4 md:mt-0
          ${isSidebarOpen ? 'blur-sm md:blur-none pointer-events-none md:pointer-events-auto' : ''}
        `}>
          <div className="max-w-5xl mx-auto">
            {activeView === 'account' && <AccountForm userData={userData} />}
            {activeView === 'address' && <AddressForm userData={userData} />}
            {activeView === 'password' && <PasswordForm />}
            {activeView === 'orders' && !selectedOrderId && (
              <OrdersTable onOrderSelect={setSelectedOrderId} />
            )}
            {activeView === 'orders' && selectedOrderId && (
              <OrderDetail 
                orderId={selectedOrderId} 
                onBack={() => setSelectedOrderId(null)}
              />
            )}
            {activeView === 'favorites' && <FavoritesTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
