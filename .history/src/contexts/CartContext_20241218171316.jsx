import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartDetails, createCartDetail, updateCartItemQuantity, deleteCartItem } from '../api/cartAPI';
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
    name: item.product_name,
    price: item.product_price,
    quantity: item.quantity,
    color: item.color,
    image: item.image_url,
    brand: item.brands_name,
    category: item.category_name,
    branch_name: item.branches_name,
    total_price: item.total_price,
    selected: true
  }));
};

const calculateTotal = (items) => {
  return items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const getSelectedItems = (items) => {
  return items.filter(item => item.selected);
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
        total: calculateTotal(transformedItems),
        selectedItems: getSelectedItems(transformedItems)
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
    case 'DELETE_CART_ITEM_SUCCESS':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        itemCount: state.itemCount - 1
      };
    case 'SELECT_CART_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload ? { ...item, selected: !item.selected } : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        selectedItems: getSelectedItems(updatedItems)
      };
    case 'SELECT_ALL_ITEMS':
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: action.payload }))
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
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
        // Direct state update instead of re-fetching the entire cart
        dispatch({ 
          type: 'ADD_TO_CART_SUCCESS', 
          payload: result.data 
        });
        toast.success('Đã thêm vào giỏ hàng thành công');
        // Remove the fetchCart() call here
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

  const removeCartItem = async (cartDetailId) => {
    try {
      const result = await deleteCartItem(cartDetailId);
      if (result.success) {
        dispatch({ type: 'DELETE_CART_ITEM_SUCCESS', payload: cartDetailId });
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      }
    } catch (error) {
      toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  };

  const selectCartItem = (itemId) => {
    dispatch({ type: 'SELECT_CART_ITEM', payload: itemId });
  };

  const selectAllItems = (isSelected) => {
    dispatch({ type: 'SELECT_ALL_ITEMS', payload: isSelected });
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
      removeCartItem,
      selectCartItem,
      selectAllItems,
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