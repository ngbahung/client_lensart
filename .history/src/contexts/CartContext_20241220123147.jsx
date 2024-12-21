import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartDetails, createCartDetail, updateCartItemQuantity, deleteCartItem } from '../api/cartAPI';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { getCouponByCode } from '../api/couponsAPI';

const CartContext = createContext(null);

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  itemCount: 0,
  updatingItems: {}, // Track which items are being updated
  coupon: null,
  discount: 0,
  selectedBranchId: null // Add this line
};

const transformCartData = (cartDetails) => {
  return cartDetails.map(item => ({
    id: item.id,
    product_id: item.product_id,
    branch_id: item.branch_id,
    name: item.product_name,
    price: parseFloat(item.product_price),
    quantity: item.quantity,
    color: item.color,
    image: item.image_url,
    brand: item.brands_name,
    category: item.category_name,
    branch_name: item.branches_name,
    total_price: parseFloat(item.product_price) * item.quantity,
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

    case 'ADD_TO_CART_SUCCESS': {
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        itemCount: state.itemCount + 1,
        total: calculateTotal(newItems)
      };
    }

    case 'UPDATE_CART_ITEM_START':
      return {
        ...state,
        updatingItems: { ...state.updatingItems, [action.payload]: true }
      };

    case 'UPDATE_CART_ITEM_SUCCESS': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              ...action.payload,
              quantity: action.payload.quantity,
              total_price: action.payload.price * action.payload.quantity
            }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        updatingItems: { ...state.updatingItems, [action.payload.id]: false }
      };
    }

    case 'UPDATE_CART_ITEM_ERROR':
      return {
        ...state,
        updatingItems: { ...state.updatingItems, [action.payload]: false }
      };

    case 'DELETE_CART_ITEM_SUCCESS': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        itemCount: state.itemCount - 1,
        total: calculateTotal(filteredItems)
      };
    }

    case 'SELECT_CART_ITEM': {
      const targetItem = state.items.find(item => item.id === action.payload);
      if (!targetItem) return state;

      // If no branch is selected, select this item's branch
      let newSelectedBranchId = state.selectedBranchId;
      if (!state.selectedBranchId && !targetItem.selected) {
        newSelectedBranchId = targetItem.branch_id;
      }
      // If this was the last selected item from this branch, clear branch selection
      else if (state.selectedBranchId === targetItem.branch_id && targetItem.selected) {
        const otherSelectedItems = state.items.filter(
          item => item.selected && item.id !== action.payload
        );
        if (otherSelectedItems.length === 0) {
          newSelectedBranchId = null;
        }
      }

      // Only allow selection if item's branch matches selected branch or no branch is selected
      const canToggle = !state.selectedBranchId || 
                       targetItem.branch_id === state.selectedBranchId;

      const itemsWithUpdatedSelection = state.items.map(item =>
        item.id === action.payload && canToggle
          ? { ...item, selected: !item.selected }
          : item
      );

      return {
        ...state,
        items: itemsWithUpdatedSelection,
        selectedBranchId: newSelectedBranchId,
        total: calculateTotal(itemsWithUpdatedSelection),
        selectedItems: getSelectedItems(itemsWithUpdatedSelection)
      };
    }

    case 'SELECT_ALL_ITEMS': {
      const branchId = state.selectedBranchId;
      const itemsWithSelection = state.items.map(item => ({
        ...item,
        selected: branchId ? item.branch_id === branchId && action.payload : action.payload
      }));

      return {
        ...state,
        items: itemsWithSelection,
        selectedBranchId: action.payload ? (branchId || itemsWithSelection.find(i => i.selected)?.branch_id) : null,
        total: calculateTotal(itemsWithSelection),
        selectedItems: getSelectedItems(itemsWithSelection)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'APPLY_COUPON_SUCCESS':
      return {
        ...state,
        coupon: action.payload,
        discount: action.payload.discount_price,
        total: calculateTotal(state.items) - action.payload.discount_price
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null,
        discount: 0,
        total: calculateTotal(state.items)
      };

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
    if (!isAuthenticated) {
        toast.info('Cần đăng nhập để thêm vào giỏ hàng');
        return false;
    }

    try {
        console.log('Adding to cart with params:', { product_id, branch_id, color, quantity });
        
        const result = await createCartDetail(product_id, branch_id, color, quantity);
        console.log('API result:', result);

        // Check if we have a successful response
        if (result.status === "success" && result.data) {
            // Fetch the updated cart to get complete item details
            await fetchCart();
            toast.success('Đã thêm vào giỏ hàng thành công');
            return true;
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Add to cart error details:', {
            error: error,
            message: error.message,
            data: error.response?.data
        });
        toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        return false;
    }
};

  const updateCartItem = async (itemId, quantity) => {
    dispatch({ type: 'UPDATE_CART_ITEM_START', payload: itemId });
    try {
      const result = await updateCartItemQuantity(itemId, quantity);
      if (result.success) {
        dispatch({ 
          type: 'UPDATE_CART_ITEM_SUCCESS', 
          payload: {
            id: itemId,
            quantity: quantity,
            price: result.data.product_price || state.items.find(item => item.id === itemId)?.price
          }
        });
        if (result.message) {
          toast.success(result.message);
        }
      } else {
        dispatch({ type: 'UPDATE_CART_ITEM_ERROR', payload: itemId });
        toast.error(result.message || 'Không thể cập nhật giỏ hàng');
      }
    } catch (error) {
      console.error('Cart update error:', error);
      dispatch({ type: 'UPDATE_CART_ITEM_ERROR', payload: itemId });
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng');
    }
  };

  const removeCartItem = async (cartDetailId) => {
    try {
        console.log('Attempting to delete cart item:', cartDetailId);
        const result = await deleteCartItem(cartDetailId);
        
        if (result.success) {
            dispatch({ type: 'DELETE_CART_ITEM_SUCCESS', payload: cartDetailId });
            toast.success(result.message || 'Đã xóa sản phẩm khỏi giỏ hàng');
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Remove cart item error:', error);
        toast.error(error.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
        return false;
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

  const applyCoupon = async (code) => {
    try {
      const result = await getCouponByCode(code);
      
      if (result.message === "success" && result.data) {
        const coupon = result.data;
        
        // Validate coupon status and quantity
        if (coupon.status !== "active") {
          toast.error('Mã giảm giá đã hết hạn hoặc không khả dụng');
          return false;
        }
        
        if (coupon.quantity <= 0) {
          toast.error('Mã giảm giá đã hết lượt sử dụng');
          return false;
        }

        dispatch({ type: 'APPLY_COUPON_SUCCESS', payload: coupon });
        toast.success(`Áp dụng mã giảm giá ${coupon.name} thành công`);
        return true;
      }
      
      toast.error('Mã giảm giá không hợp lệ');
      return false;
    } catch (error) {
      toast.error('Có lỗi xảy ra khi áp dụng mã giảm giá');
      return false;
    }
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
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
      refreshCart: fetchCart,
      applyCoupon,
      removeCoupon
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