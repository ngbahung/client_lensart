import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOrder, createPayOSCheckout, updatePaymentStatus } from '../checkoutAPI';
import api from '../../utils/api';

// Mock api module
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('checkoutAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should successfully create order with valid data', async () => {
      const mockOrderData = {
        branch_id: 1,
        address: '123 Test Street, Ward 1, District 1, Ho Chi Minh City',
        note: 'Test note',
        coupon_id: null,
        shipping_fee: 20000,
        payment_method: 'Tiền mặt',
        order_details: [
          {
            product_id: 1,
            color: 'black',
            quantity: 2,
            total_price: 200000,
            is_lens: false,
            associated_frame_id: null,
          },
        ],
      };

      const mockResponse = {
        data: {
          status: 'success',
          data: {
            id: 1,
            order_number: 'ORD-001',
            total: 220000,
          },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await createOrder(mockOrderData);

      expect(api.post).toHaveBeenCalledWith('/orders/create', mockOrderData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle error when creating order', async () => {
      const mockOrderData = {
        branch_id: 1,
        address: '123 Test Street',
        order_details: [],
      };

      const mockError = {
        response: {
          data: {
            message: 'Số lượng trong kho không đủ',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(createOrder(mockOrderData)).rejects.toEqual(mockError.response.data);
    });

    it('should create order with coupon', async () => {
      const mockOrderData = {
        branch_id: 1,
        address: '123 Test Street',
        coupon_id: 1,
        shipping_fee: 0,
        payment_method: 'Tiền mặt',
        order_details: [
          {
            product_id: 1,
            color: 'black',
            quantity: 1,
            total_price: 100000,
          },
        ],
      };

      const mockResponse = {
        data: {
          status: 'success',
          data: { id: 1 },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await createOrder(mockOrderData);

      expect(api.post).toHaveBeenCalledWith('/orders/create', mockOrderData);
      expect(result.data.id).toBe(1);
    });
  });

  describe('createPayOSCheckout', () => {
    it('should successfully create PayOS checkout', async () => {
      const orderId = 1;
      const shippingFee = 20000;

      // Mock environment variables
      import.meta.env = {
        VITE_APP_URL: 'http://localhost:3000',
        DEV: true,
      };

      const mockResponse = {
        data: {
          status: 'success',
          data: {
            checkoutUrl: 'https://pay.payos.vn/web/...',
          },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await createPayOSCheckout(orderId, shippingFee);

      expect(api.post).toHaveBeenCalledWith(
        `/transactions/orders/${orderId}/create`,
        {
          returnUrl: 'http://localhost:3000/order-success',
          cancelUrl: 'http://localhost:3000/gio-hang',
          shipping_fee: shippingFee,
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle error when creating PayOS checkout', async () => {
      const orderId = 1;
      const shippingFee = 20000;

      const mockError = {
        response: {
          data: {
            message: 'Payment creation failed',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(createPayOSCheckout(orderId, shippingFee)).rejects.toEqual(
        mockError.response.data
      );
    });
  });

  describe('updatePaymentStatus', () => {
    it('should successfully update payment status', async () => {
      const orderId = 1;

      const mockResponse = {
        data: {
          status: 'success',
          message: 'Payment status updated',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await updatePaymentStatus(orderId);

      expect(api.post).toHaveBeenCalledWith(`transactions/update/order/${orderId}`);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle error when updating payment status', async () => {
      const orderId = 1;

      const mockError = {
        response: {
          data: {
            message: 'Order not found',
          },
        },
      };

      api.post.mockRejectedValue(mockError);

      await expect(updatePaymentStatus(orderId)).rejects.toEqual(mockError.response.data);
    });
  });
});

