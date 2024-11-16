import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';

// Layouts
const UserLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    {children}
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <UserLayout>
            <Routes>
              <Route index element={<Homepage />} />
            </Routes>
          </UserLayout>
        } />

        <Route path="" element={<Navigate to="/" replace />} />
      </Routes>
    </Routes>
  );
};

export default AppRoutes;