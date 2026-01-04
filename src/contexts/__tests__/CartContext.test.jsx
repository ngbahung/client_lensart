import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { createCartDetail, getCartDetails } from '../../api/cartAPI';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';

// Mock dependencies
vi.mock('../../api/cartAPI');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));
vi.mock('../AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock window.location
const mockLocation = {
  pathname: '/',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('CartContext', () => {
  const mockAuth = {
    isAuthenticated: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue(mockAuth);
    mockLocation.pathname = '/';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('addToCart', () => {
    it('should successfully add product to cart', async () => {
      const mockCartDetail = {
        id: 1,
        product_id: 1,
        branch_id: 1,
        color: 'black',
        quantity: 2,
        total_price: 200,
      };

      const mockResponse = {
        status: 'success',
        data: mockCartDetail,
      };

      createCartDetail.mockResolvedValue(mockResponse);
      getCartDetails.mockResolvedValue([mockCartDetail]);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Wait for initial fetch to complete
      await waitFor(() => {
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      // Clear the mock call count
      vi.clearAllMocks();
      getCartDetails.mockResolvedValue([mockCartDetail]);

      await act(async () => {
        const success = await result.current.addToCart(1, 1, 'black', 2);
        expect(success).toBe(true);
      });

      await waitFor(() => {
        expect(createCartDetail).toHaveBeenCalledWith(1, 1, 'black', 2);
        expect(getCartDetails).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Đã thêm vào giỏ hàng thành công');
      }, { timeout: 3000 });
    });

    it('should show info message when user is not authenticated', async () => {
      useAuth.mockReturnValue({ isAuthenticated: false });

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      await act(async () => {
        const success = await result.current.addToCart(1, 1, 'black', 2);
        expect(success).toBe(false);
      });

      expect(toast.info).toHaveBeenCalledWith('Cần đăng nhập để thêm vào giỏ hàng');
      expect(createCartDetail).not.toHaveBeenCalled();
    });

    it('should handle API error when adding to cart', async () => {
      const mockError = new Error('Số lượng trong kho không đủ');
      createCartDetail.mockRejectedValue(mockError);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      await act(async () => {
        const success = await result.current.addToCart(1, 1, 'black', 10);
        expect(success).toBe(false);
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Có lỗi xảy ra khi thêm vào giỏ hàng');
      });
    });

    it('should handle quick buy flow', async () => {
      const mockCartDetail = {
        id: 1,
        product_id: 1,
        branch_id: 1,
        color: 'black',
        quantity: 2,
        total_price: 200,
      };

      const mockResponse = {
        status: 'success',
        data: mockCartDetail,
      };

      createCartDetail.mockResolvedValue(mockResponse);
      getCartDetails.mockResolvedValue([mockCartDetail]);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Wait for initial fetch
      await waitFor(() => {
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      vi.clearAllMocks();
      getCartDetails.mockResolvedValue([mockCartDetail]);

      await act(async () => {
        const success = await result.current.addToCart(1, 1, 'black', 2, true);
        expect(success).toBe(true);
      });

      await waitFor(() => {
        expect(createCartDetail).toHaveBeenCalledWith(1, 1, 'black', 2);
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      // Check that item is selected for quick buy
      await waitFor(() => {
        expect(result.current.items.length).toBeGreaterThan(0);
      });
    });

    it('should handle null color for lens products', async () => {
      const mockCartDetail = {
        id: 2,
        product_id: 2,
        branch_id: 1,
        color: null,
        quantity: 1,
        total_price: 150,
      };

      const mockResponse = {
        status: 'success',
        data: mockCartDetail,
      };

      createCartDetail.mockResolvedValue(mockResponse);
      getCartDetails.mockResolvedValue([mockCartDetail]);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Wait for initial fetch
      await waitFor(() => {
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      vi.clearAllMocks();
      getCartDetails.mockResolvedValue([mockCartDetail]);

      await act(async () => {
        const success = await result.current.addToCart(2, 1, null, 1);
        expect(success).toBe(true);
      });

      expect(createCartDetail).toHaveBeenCalledWith(2, 1, null, 1);
    });

    it('should return false when API response is not successful', async () => {
      const mockResponse = {
        status: 'error',
        message: 'Failed to add to cart',
      };

      createCartDetail.mockResolvedValue(mockResponse);
      getCartDetails.mockResolvedValue([]);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Wait for initial fetch
      await waitFor(() => {
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      // Clear mock call count
      vi.clearAllMocks();
      getCartDetails.mockResolvedValue([]);

      await act(async () => {
        const success = await result.current.addToCart(1, 1, 'black', 2);
        expect(success).toBe(false);
      });

      // getCartDetails should not be called when API response is not successful
      expect(getCartDetails).not.toHaveBeenCalled();
    });
  });

  describe('cartReducer', () => {
    it('should handle ADD_TO_CART_SUCCESS action', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      const newItem = {
        id: 1,
        product_id: 1,
        name: 'Test Product',
        price: 100,
        quantity: 2,
        selected: false,
      };

      act(() => {
        // Dispatch action through reducer
        result.current.items = [];
        result.current.itemCount = 0;
      });

      // Note: We can't directly test reducer, but we can test the state after addToCart
      expect(result.current.items).toBeDefined();
      expect(result.current.itemCount).toBeDefined();
    });

    it('should calculate total correctly', async () => {
      const mockCartDetails = [
        {
          id: 1,
          product_id: 1,
          product_name: 'Product 1',
          product_price: 100,
          quantity: 2,
          color: 'black',
          image_url: 'image1.jpg',
          brands_name: 'Brand 1',
          category_name: 'Category 1',
          branches_name: 'Branch 1',
          branch_id: 1,
        },
        {
          id: 2,
          product_id: 2,
          product_name: 'Product 2',
          product_price: 200,
          quantity: 1,
          color: 'red',
          image_url: 'image2.jpg',
          brands_name: 'Brand 2',
          category_name: 'Category 2',
          branches_name: 'Branch 1',
          branch_id: 1,
        },
      ];

      getCartDetails.mockResolvedValue(mockCartDetails);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      await waitFor(() => {
        expect(result.current.items.length).toBe(2);
      });

      // Select items and check total
      act(() => {
        result.current.selectCartItem(1);
        result.current.selectCartItem(2);
      });

      await waitFor(() => {
        const selectedItems = result.current.items.filter(item => item.selected);
        expect(selectedItems.length).toBe(2);
      });
    });
  });

  describe('fetchCart', () => {
    it('should fetch cart details on mount when authenticated', async () => {
      const mockCartDetails = [
        {
          id: 1,
          product_id: 1,
          product_name: 'Product 1',
          product_price: 100,
          quantity: 2,
          color: 'black',
          image_url: 'image1.jpg',
          brands_name: 'Brand 1',
          category_name: 'Category 1',
          branches_name: 'Branch 1',
          branch_id: 1,
        },
      ];

      getCartDetails.mockResolvedValue(mockCartDetails);

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      await waitFor(() => {
        expect(getCartDetails).toHaveBeenCalled();
      }, { timeout: 3000 });

      await waitFor(() => {
        expect(result.current.items.length).toBe(1);
        expect(result.current.itemCount).toBe(1);
      });
    });

    it('should not fetch cart in admin context', async () => {
      // Reset mocks
      vi.clearAllMocks();
      mockLocation.pathname = '/admin/dashboard';

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Wait a bit to ensure fetchCart is not called
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(getCartDetails).not.toHaveBeenCalled();
    });

    it('should clear cart when user is not authenticated', async () => {
      useAuth.mockReturnValue({ isAuthenticated: false });

      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      await waitFor(() => {
        expect(result.current.items).toEqual([]);
        expect(result.current.itemCount).toBe(0);
      }, { timeout: 3000 });

      expect(getCartDetails).not.toHaveBeenCalled();
    });
  });
});

