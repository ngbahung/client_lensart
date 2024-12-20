import { createContext, useContext, useReducer, useEffect } from 'react';
import { adminLogin, adminLogout } from '../api/authAPI';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AdminAuthContext = createContext(null);

const initialState = {
  adminUser: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
  loading: true,
  error: null
};

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN_AUTH_INIT':
      return {
        ...state,
        loading: false,
        adminUser: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'ADMIN_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        adminUser: action.payload.user,
        token: action.payload.token,
      };
    case 'ADMIN_LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        adminUser: null,
        token: null
      };
    case 'ADMIN_LOGOUT':
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      delete axios.defaults.headers.common['Authorization'];
      return {
        ...state,
        isAuthenticated: false,
        adminUser: null,
        token: null
      };
    default:
      return state;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // You can add admin user data fetching here if needed
        dispatch({ type: 'ADMIN_AUTH_INIT', payload: { email: localStorage.getItem('adminEmail') } });
      } else {
        dispatch({ type: 'ADMIN_AUTH_INIT', payload: null });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const token = await adminLogin(credentials);
      
      // Set admin token in localStorage and axios headers
      localStorage.setItem('adminToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userData = { email: credentials.email, role: 'admin' };
      
      dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: { token, user: userData }
      });
      
      return userData;
    } catch (error) {
      dispatch({
        type: 'ADMIN_LOGIN_ERROR',
        payload: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
      dispatch({ type: 'ADMIN_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: 'ADMIN_LOGOUT' });
    }
  };

  return (
    <AdminAuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};