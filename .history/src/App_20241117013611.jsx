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
      <AppRoutes
    </Router>
  );
};

export default App;