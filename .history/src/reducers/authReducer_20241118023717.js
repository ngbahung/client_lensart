export const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        error: action.payload,
        loading: false
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};