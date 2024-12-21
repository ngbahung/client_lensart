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

const transformCartData = (cartDetails) => {
  return cartDetails.map(item => ({
    id: item.id,
    product_id: item.product_id,
    name: item.product_name,
    color: item.color,
    price: item.price,
    quantity: item.quantity,
    image: item.product_image,
    branch_id: item.branch_id,
    selected: true,
    stock: item.stock_quantity
  }));
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CART_START':
      return { ...state, loading: true };
    case 'FETCH_CART_SUCCESS':
      const transformedItems = transformCartData(action.payload);
      return {
        ...state,
        loading: false,
        items: transformedItems,
        itemCount: transformedItems.length,
        total: calculateTotal(transformedItems)
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
    case 'UPDATE_CART_ITEM_SUCCESS':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
        total: calculateTotal(state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ))
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

  const updateCartItem = async (cartDetailId, product_id, branch_id, color, quantity) => {
    try {
      const result = await updateCartItemQuantity(cartDetailId, product_id, branch_id, color, quantity);
      if (result.success) {
        dispatch({ type: 'UPDATE_CART_ITEM_SUCCESS', payload: result.data });
        toast.success('Đã cập nhật giỏ hàng');
      } else {
        toast.error(result.message || 'Không thể cập nhật giỏ hàng');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật giỏ hàng');
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
      updateCartItem,
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