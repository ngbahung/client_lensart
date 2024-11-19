import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './Routes';

const App = () => {
  return (
    <Router>
       <ProgressBar />
      <AppRoutes />
    </Router>
  );
};

export default App;