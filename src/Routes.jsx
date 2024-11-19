import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import UserLoginPage from './pages/EndUser/LoginPage';
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
import Footer from './components/EndUser/Footer/Footer';
import SignUpPage from './pages/EndUser/SignUpPage';
import SendOTPPage from './pages/EndUser/SendOTPPage';
import FramesPage from './pages/EndUser/FramesPage';
import Navbar from './components/Admin/Navbar_Header/Navbar';
import Header_Admin from './components/Admin/Navbar_Header/Header';

const UserLayout = () => (
  <div className="min-h-screen flex flex-col pt-[128px] md:pt-[144px]">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AdminLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin";

  return isLoginPage ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 admin-page">
      <Outlet />
    </div>
  ) : (
    <div className="flex min-h-screen admin-page">
      <Navbar />
      <div className="flex-1 bg-[#eff9f9] min-h-screen pl-[17%] flex flex-col">
        <div className="md-4 h-[8%]">
          <Header_Admin />
        </div>
        <div className="bg-white rounded-md flex-grow m-7 h-[98%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

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
        <Route path="gong-kinh" element={<FramesPage />} />
        {/* Add other user routes here */}
      </Route>

      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
