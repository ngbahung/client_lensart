import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/EndUser/Header/Header';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';

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
        <Route path="/admin/login" element={<LoginPage />} />
        
        {/* User Routes */}
        <Route path="/" element={
          <UserLayout>
            <Routes>
              <Route index element={<Homepage />} />
            </Routes>
          </UserLayout>
        } />
        
        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;