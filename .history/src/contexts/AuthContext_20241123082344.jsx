import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get CSRF cookie from Laravel
        await api.get('/sanctum/csrf-cookie');
        const response = await api.get('/api/auth/login');
        dispatch({ type: 'AUTH_INIT', payload: response.data });
      } catch (error) {
        dispatch({ type: 'AUTH_INIT', payload: null });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      
      // Update to use /auth prefix and capture the response data
      const loginResponse = await api.post('/api/auth/login', credentials);
      
      // Only proceed to get user data if login was successful
      if (loginResponse.data.success) {
        const userResponse = await api.get('/api/auth/login');
        dispatch({ type: 'LOGIN_SUCCESS', payload: userResponse.data });
        return userResponse.data;
      } else {
        // If login response indicates failure
        throw new Error(loginResponse.data.message || 'Authentication failed');
      }
    } catch (error) {
      // Get the most specific error message available
      const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Update to use /auth prefix
      await api.post('api/auth/logout');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);