import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUserData } from '../../../api/userAPI';
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from "./UserSidebar";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";
import OrdersTable from "./OrdersTable";

function UserDashboard() {
  const [activeView, setActiveView] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

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
      {activeView === 'orders' && <OrdersTable orders={mockOrders} />}
    </div>
  );
}

export default UserDashboard;
