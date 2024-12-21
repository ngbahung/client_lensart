import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const AdminAuthContext = createContext(null);

const initialState = {
  admin: null,
  adminToken: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
  loading: true,
  error: null
};

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        loading: false,
        admin: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('adminToken', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
        adminToken: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('adminToken');
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        adminToken: null,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('adminToken');
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        adminToken: null
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
        try {
          // Add API call to verify admin token and get admin data
          const response = await api.get('/admin/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          dispatch({ type: 'AUTH_INIT', payload: response.data });
        } catch (error) {
          dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
      } else {
        dispatch({ type: 'AUTH_INIT', payload: null });
      }
    };

    initializeAuth();
  }, []);

  const adminLogin = async (credentials) => {
    try {
      const response = await api.post('/admin/login', credentials);
      const { token, admin } = response.data;
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { token, admin }
      });
      
      toast.success('Admin đăng nhập thành công!');
      return admin;
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || 'Đăng nhập thất bại'
      });
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
      throw error;
    }
  };

  const adminLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Admin đã đăng xuất');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      ...state,
      adminLogin,
      adminLogout
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
