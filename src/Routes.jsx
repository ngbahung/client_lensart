import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import UserLoginPage from './pages/EndUser/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';
import Footer from './components/EndUser/Footer/Footer';
import SignUpPage from './pages/EndUser/SignUpPage';
import SendOTPPage from './pages/EndUser/SendOTPPage';
import GongKinhPage from './pages/EndUser/GongKinhPage';
import ProductDetailPage from './pages/EndUser/ProductDetailPage';

import DashboardPage from './pages/Admin/DashboardPage';
import TransactionsPage from './pages/Admin/TransactionsPage';
import CouponsPage from './pages/Admin/CouponsPage';
import ManageBlogsPage from './pages/Admin/ManageBlogsPage';
import BranchesPage from './pages/Admin/BranchesPage';
import BannersPage from './pages/Admin/BannersPage';
import CategoryPage from './pages/Admin/Categories/CategoryPage';
import ShapePage from './pages/Admin/Categories/ShapePage';
const UserLayout = () => (
  <div className="min-h-screen flex flex-col pt-[128px] md:pt-[144px]">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
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
        <Route path="login" element={<UserLoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="verify-otp" element={<SendOTPPage />} />
        <Route path="gong-kinh" element={<GongKinhPage />} />
        <Route path="gong-kinh/:productId" element={<ProductDetailPage />} />
        <Route path="product/:productId" element={<Navigate to="/gong-kinh/:productId" replace />} />
        {/* Add other user routes here */}
      </Route>

      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
