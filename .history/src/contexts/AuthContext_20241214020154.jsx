import { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getUser();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);