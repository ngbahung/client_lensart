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
        <Route path="/admin" element={<LoginPage />} />
        
        {/* User Routes */}
        <Route path="/" element={
          <UserLayout>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path=""
            </Routes>
          </UserLayout>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;