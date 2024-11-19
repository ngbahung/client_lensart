import { createContext, useReducer, useContext, useEffect } from 'react';
import api from '../utils/api';
import { authReducer, initialState } from '../reducers/authReducer';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
            
            if (token && savedUser) {
                try {
                    await api.get('/validate-token');
                    dispatch({ 
                        type: 'AUTH_INIT', 
                        payload: { user: JSON.parse(savedUser) }
                    });
                } catch (error) {
                    dispatch({ type: 'LOGOUT' });
                }
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        validateToken();
    }, []);

    const login = async (userData, token) => {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: userData, token }
            });
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.message
            });
        }
    };

    const logout = () => {
        delete api.defaults.headers.common['Authorization'];
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user: state.user,
                loading: state.loading,
                error: state.error,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);