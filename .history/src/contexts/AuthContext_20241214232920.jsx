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
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
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
      localStorage.removeItem('user');
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
        const user = await authService.getUser();
        dispatch({ type: 'AUTH_INIT', payload: user });
      } catch (error) {
        dispatch({ type: 'AUTH_INIT', payload: null });
      }
    };

    initAuth();
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