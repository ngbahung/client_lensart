import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/EndUser/Header/Header';
import LoginPage from './pages/Admin/LoginPage';

// Create a layout component for pages that need header
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

// Create a component to handle header visibility
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;