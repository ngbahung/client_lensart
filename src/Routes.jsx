import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';
import DashboardPage from './pages/Admin/DashboardPage';
import TransactionsPage from './pages/Admin/TransactionsPage';
import CouponsPage from './pages/Admin/CouponsPage';
import ManageBlogsPage from './pages/Admin/ManageBlogsPage';
import BranchesPage from './pages/Admin/BranchesPage';
import BannersPage from './pages/Admin/BannersPage';
import CategoryPage from './pages/Admin/Categories/CategoryPage';
import ShapePage from './pages/Admin/Categories/ShapePage';
const UserLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
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
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="blogs" element={<ManageBlogsPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="banners" element={<BannersPage />} />
        <Route path="categories/Category" element={<CategoryPage />} />
        <Route path="categories/Shape" element={<ShapePage />} />
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
