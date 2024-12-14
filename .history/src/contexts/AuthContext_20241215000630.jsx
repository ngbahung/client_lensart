import { createContext, useContext, useReducer, useEffect } from 'react';
import authAPI from '../api/authAPI';
import userAPI from '../api/userAPI';

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
      const response = await authAPI.login(credentials);
      const token = response;
      
      // Set token in localStorage and axios headers
      localStorage.setItem('token', token);
      authAPI.setToken(token);
      
      
      // Fetch user data after successful login
      const userData = await userAPI.default.getUserData();
      console.log('User data:', userData);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { token, user: userData }
      });
      
      return userData;
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  };

const logout = () => {
  dispatch({ type: 'LOGOUT' });
};

return (
  <AuthContext.Provider value={{ 
    ...state,
    login,
    logout
  }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
