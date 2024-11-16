// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Admin/LoginPage';
import Homepage from '../pages/EndUser/Homepage';
import Header from '../components/EndUser/Header/Header';

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

const AppRouter = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <AdminLayout>
            <Routes>
              <Route index element={<Navigate to="login" />} />
              <Route path="login" element={<LoginPage />} />
            </Routes>
          </AdminLayout>
        }
      />

      {/* User Routes */}
      <Route 
        path="/*" 
        element={
          <UserLayout>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </UserLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;