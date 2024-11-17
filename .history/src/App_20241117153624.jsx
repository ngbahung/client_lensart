import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import ProgressBar from './components/ProgressBar';
import 'nprogress/nprogress.css';

const App = () => {
  return (
    <Router>
      <ProgressBar />
      <AppRoutes />
    </Router>
  );
};

export default App;