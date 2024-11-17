import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './Routes';
import ProgressBar from './components/ProgressBar';
import 'nprogress/nprogress.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <Router>
      <ProgressBar />
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
};

export default App;