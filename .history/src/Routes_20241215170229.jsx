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
import ShoppingCartPage from './pages/EndUser/ShoppingCartPage';
import CheckOutPage from './pages/EndUser/CheckOutPage';
import ProtectedRoute from './components/ProtectedRoute';
import User
const UserLayout = () => (
  <div className="min-h-screen flex flex-col pt-[128px] md:pt-[144px]">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={
          <ProtectedRoute>
            {/* Your protected admin routes */}
          </ProtectedRoute>
        } />
      </Route>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<UserLoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="verify-otp" element={<SendOTPPage />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <UserDashboard />
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
          <Route index element={<GongKinhPage categoryId={3} pageTitle="Kính Râm" />} />
          <Route 
            path="filter/:type/:value" 
            element={<GongKinhPage categoryId={3} pageTitle="Kính Râm" />} 
          />
          <Route path=":productId" element={<ProductDetailPage />} />
        </Route>
        <Route path="trong-kinh">
          <Route index element={<GongKinhPage categoryId={1} pageTitle="Tròng Kính" />} />
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