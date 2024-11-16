import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';

const UserLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LoginPage />} />
            {/* Add other admin routes here */}
          </Routes>
        </AdminLayout>
      } />
        <Route path="/" element={
          <UserLayout>
            <Routes>
              <Route index element={<Homepage />} />
            </Routes>
          </UserLayout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;