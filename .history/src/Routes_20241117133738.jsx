import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import LoginPage from './pages/EndUser/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';

const UserLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin">
        {/* <Route index element={<Navigate to="login" />} /> */}
        <Route path="login" element={<LoginPage />} />
        {/* Add other admin routes here */}
      </Route>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Add other user routes here */}
      </Route>
      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;