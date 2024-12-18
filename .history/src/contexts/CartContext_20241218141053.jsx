import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartDetails, createCartDetail } from '../api/cartAPI';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  itemCount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CART_START':
      return { ...state, loading: true };
    case 'FETCH_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
        itemCount: action.payload.length,
        total: calculateTotal(action.payload)
      };
    case 'FETCH_CART_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
        total: calculateTotal([...state.items, action.payload])
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    dispatch({ type: 'FETCH_CART_START' });
    try {
      const cartData = await getCartDetails();
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: cartData });
    } catch (error) {
      dispatch({ type: 'FETCH_CART_ERROR', payload: error.message });
      toast.error('Không thể tải giỏ hàng');
    }
  };

  const addToCart = async (product_id, branch_id, color, quantity) => {
    try {
      const result = await createCartDetail(product_id, branch_id, color, quantity);
      if (result.success) {
        dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: result.data });
        toast.success('Đã thêm vào giỏ hàng thành công');
        await fetchCart(); // Refresh cart data
      } else {
        toast.error(result.message || 'Không thể thêm vào giỏ hàng');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      clearCart,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};