// src/components/ProgressBar.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 500
});

const ProgressBar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (isLoading) {
        NProgress.done();
      }
    };
  }, [location.pathname]);

  return null;
};

export default ProgressBar;