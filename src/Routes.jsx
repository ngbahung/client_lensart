import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import AdminHomePage from './pages/Admin/AdminHomePage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';

const UserLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <h2>Admin Layout</h2>
    <Outlet />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Trang login mặc định khi vào /admin */}
        <Route index element={<LoginPage />} />
        {/* Các route admin khác */}
        <Route path="home" element={<AdminHomePage />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
      </Route>

      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
