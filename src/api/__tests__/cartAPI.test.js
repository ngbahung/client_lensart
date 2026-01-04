import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCartDetail, getCartDetails, updateCartItemQuantity, deleteCartItem } from '../cartAPI';
import api from '../../utils/api';

// Mock api module
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('cartAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createCartDetail', () => {
    it('should successfully add product to cart', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: {
            id: 1,
            product_id: 1,
            branch_id: 1,
            color: 'black',
            quantity: 2,
            total_price: 200,
          },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await createCartDetail(1, 1, 'black', 2);

      expect(api.post).toHaveBeenCalledWith('/cart_details/create', {
        product_id: 1,
        branch_id: 1,
        color: 'black',
        quantity: 2,
      });

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API error when adding to cart', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Số lượng trong kho không đủ',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(createCartDetail(1, 1, 'black', 10)).rejects.toEqual(mockError);
      expect(api.post).toHaveBeenCalledWith('/cart_details/create', {
        product_id: 1,
        branch_id: 1,
        color: 'black',
        quantity: 10,
      });
    });

    it('should handle network error', async () => {
      const mockError = new Error('Network Error');
      api.post.mockRejectedValue(mockError);

      await expect(createCartDetail(1, 1, 'black', 2)).rejects.toThrow('Network Error');
    });

    it('should call API with correct parameters for different products', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: { id: 2 },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      await createCartDetail(5, 3, 'red', 1);

      expect(api.post).toHaveBeenCalledWith('/cart_details/create', {
        product_id: 5,
        branch_id: 3,
        color: 'red',
        quantity: 1,
      });
    });

    it('should handle null color for lens products', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: { id: 3 },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      await createCartDetail(1, 1, null, 1);

      expect(api.post).toHaveBeenCalledWith('/cart_details/create', {
        product_id: 1,
        branch_id: 1,
        color: null,
        quantity: 1,
      });
    });
  });

  describe('getCartDetails', () => {
    it('should successfully fetch cart details', async () => {
      const mockCartData = [
        {
          id: 1,
          product_id: 1,
          product_name: 'Product 1',
          quantity: 2,
          product_price: 100,
        },
        {
          id: 2,
          product_id: 2,
          product_name: 'Product 2',
          quantity: 1,
          product_price: 200,
        },
      ];

      const mockResponse = {
        data: {
          data: mockCartData,
        },
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await getCartDetails();

      expect(api.get).toHaveBeenCalledWith('/cart_details');
      expect(result).toEqual(mockCartData);
    });

    it('should handle error when fetching cart details', async () => {
      const mockError = new Error('Failed to fetch cart');
      api.get.mockRejectedValue(mockError);

      await expect(getCartDetails()).rejects.toThrow('Failed to fetch cart');
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should successfully update cart item quantity', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: 1,
            quantity: 5,
            product_price: 100,
          },
          message: 'Cập nhật số lượng thành công',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await updateCartItemQuantity(1, 5);

      expect(api.post).toHaveBeenCalledWith('/cart_details/update/1', {
        quantity: 5,
      });

      expect(result).toEqual({
        success: true,
        data: mockResponse.data.data,
        message: 'Cập nhật số lượng thành công',
      });
    });

    it('should handle error when updating quantity', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Số lượng trong kho không đủ',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(updateCartItemQuantity(1, 100)).rejects.toThrow('Số lượng trong kho không đủ');
    });
  });

  describe('deleteCartItem', () => {
    it('should successfully delete cart item', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Item successfully deleted',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await deleteCartItem(1);

      expect(api.post).toHaveBeenCalledWith('/cart_details/delete/1');
      expect(result).toEqual({
        success: true,
        message: 'Item successfully deleted',
        data: undefined,
      });
    });

    it('should handle error when deleting cart item', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Cart item not found',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(deleteCartItem(999)).rejects.toEqual({
        success: false,
        message: 'Cart item not found',
        error: mockError,
      });
    });
  });
});

