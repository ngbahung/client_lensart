import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import LoginPage from './pages/Admin/LoginPage';
import UserLoginPage from './pages/EndUser/LoginPage';
import Homepage from './pages/EndUser/Homepage';
import Header from './components/EndUser/Header/Header';
import Footer from './components/EndUser/Footer/Footer';
import SignUpPage from './pages/EndUser/SignUpPage';
import SendOTPPage from './pages/EndUser/SendOTPPage';
import GongKinhPage from './pages/EndUser/GongKinhPage';
import ProductDetailPage from './pages/EndUser/ProductDetailPage';
import ShoppingCartPage from './pages/EndUser/ShoppingCartPage';
import CheckOutPage from './pages/EndUser/CheckOutPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserAccountPage from './pages/EndUser/UserAccountPage';

import DashboardPage from './pages/Admin/DashboardPage';
import TransactionsPage from './pages/Admin/TransactionsPage';
import CouponsPage from './pages/Admin/CouponsPage';
import ManageBlogsPage from './pages/Admin/ManageBlogsPage';
import BranchesPage from './pages/Admin/BranchesPage';
import BannersPage from './pages/Admin/BannersPage';
import CategoryPage from './pages/Admin/Categories/CategoryPage';
import ShapePage from './pages/Admin/Categories/ShapePage';
import MaterialsPage from './pages/Admin/Categories/MaterialsPage';
import FeaturesPage from './pages/Admin/Categories/FeaturesPage';
import BrandsPage from './pages/Admin/Products/BrandsPage';
import ProductsPage from './pages/Admin/Products/ProductsPage';
import Product_ReviewsPage from './pages/Admin/Products/Product_ReviewsPage';
import Navbar from './components/Admin/Navbar_Header/Navbar';
import Header_Admin from './components/Admin/Navbar_Header/Header';
import ProtectedAdminRoute from './components/Admin/ProtectedAdminRoute';

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

  return (
    <>
      {isLoginPage ? (
        <div className="min-h-screen bg-[#eff9f9] flex items-center justify-center px-4">
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
      )}
    </>
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
        <Route path="category" element={<CategoryPage />} />
        <Route path="shape" element={<ShapePage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product-reviews" element={<Product_ReviewsPage />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<UserLoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="verify-otp" element={<SendOTPPage />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <UserAccountPage />
          </ProtectedRoute>
        } />
        <Route path="gio-hang" element={<ShoppingCartPage />} />
        <Route path="checkout" element={<CheckOutPage />} />
        <Route path="gong-kinh">
          <Route index element={<GongKinhPage />} />
          <Route path="filter/:type/:value" element={<GongKinhPage />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="kinh-ram">
          <Route index element={<GongKinhPage categoryId={2} pageTitle="Kính Râm" />} />
          <Route 
            path="filter/:type/:value" 
            element={<GongKinhPage categoryId={2} pageTitle="Kính Râm" />} 
          />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="trong-kinh">
          <Route index element={<GongKinhPage categoryId={3} pageTitle="Tròng Kính" />} />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="product/:productId" element={<Navigate to={location => `/gong-kinh/${location.pathname.split('/').pop()}`} replace />} />
        {/* Add other user routes here */}
      </Route>

      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
