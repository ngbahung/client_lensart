import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/EndUser/Header/Header';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';

// Admin Layout Component
const AdminLayout = ({ children }) => {
  return <div className="admin-layout">{children}</div>;
};

// User Layout Component
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <AdminLayout>
              <Routes>
                <Route index element={<Navigate to="login" />} />
                <Route path="login" element={<LoginPage />} />
                {/* Add other admin routes here */}
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
    </Router>
  );
};

export default App;