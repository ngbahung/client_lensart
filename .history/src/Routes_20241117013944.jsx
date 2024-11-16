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
      
    </Routes>
  );
};

export default AppRoutes;