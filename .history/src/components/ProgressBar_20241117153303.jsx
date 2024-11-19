// src/components/ProgressBar.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
};

export default ProgressBar;