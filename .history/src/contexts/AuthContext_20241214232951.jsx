import { createContext, useContext, useReducer, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      if (state.token) {
        try {
          const userData = await userAPI.getUserData();
          dispatch({ type: 'AUTH_INIT', payload: userData });
        } catch (error) {
          dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
      } else {
        dispatch({ type: 'AUTH_INIT', payload: null });
      }
    };

    initializeAuth();
  }, []);
  
  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
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