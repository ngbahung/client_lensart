import { createContext, useContext, useReducer, useEffect } from "react";
import * as authService from "../services/authService";
import { useState } from "react";

const AuthContext = createContext({null});

// const initialState = {
//   user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
//   isAuthenticated: !!localStorage.getItem('user'),
//   loading: true,
//   error: null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'AUTH_INIT':
//       return {
//         ...state,
//         loading: false,
//         user: action.payload
//       };
//     case 'LOGIN_SUCCESS':
//       localStorage.setItem('user', JSON.stringify(action.payload));
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload,
//         error: null
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         error: action.payload
//       };
//     case 'LOGOUT':
//       localStorage.removeItem('user');
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null
//       };
//     default:
//       return state;
//   }
// };

export const AuthProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        setUser({});
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      setIsAuthenticated(true);
      setError("");
      setUser(user);
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setIsAuthenticated(false);
      setError(errorMessage);
      setUser({});
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser({});
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        error,
        setError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
