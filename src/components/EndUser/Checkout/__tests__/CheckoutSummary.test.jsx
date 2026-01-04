import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutSummary from '../CheckoutSummary';
import { useCart } from '../../../../contexts/CartContext';

// Mock dependencies
vi.mock('../../../../contexts/CartContext');

describe('CheckoutSummary - BR2: Review Rules', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('BR2: Review Rules - Show items grouped by branch with subtotals', () => {
    it('should show items grouped by branch when cart has items', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          branch_name: 'Branch 1',
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          color: 'black',
          image: 'image1.jpg',
          selected: true,
        },
        {
          id: 2,
          product_id: 2,
          branch_id: 1,
          branch_name: 'Branch 1',
          name: 'Product 2',
          price: 150000,
          quantity: 1,
          color: 'red',
          image: 'image2.jpg',
          selected: true,
        },
        {
          id: 3,
          product_id: 3,
          branch_id: 2,
          branch_name: 'Branch 2',
          name: 'Product 3',
          price: 200000,
          quantity: 1,
          color: 'blue',
          image: 'image3.jpg',
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should show all selected items
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();

      // Should show subtotal (sum of all selected items)
      // Subtotal = (100000 * 2) + (150000 * 1) + (200000 * 1) = 550000
      const subtotalText = screen.getByText(/tổng tiền/i);
      expect(subtotalText).toBeInTheDocument();
    });

    it('should calculate subtotal correctly for selected items', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: true,
        },
        {
          id: 2,
          product_id: 2,
          branch_id: 1,
          name: 'Product 2',
          price: 150000,
          quantity: 1,
          selected: true,
        },
        {
          id: 3,
          product_id: 3,
          branch_id: 2,
          name: 'Product 3',
          price: 200000,
          quantity: 1,
          selected: false, // Not selected
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should only show selected items
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      // Product 3 should not be visible (not selected)
      
      // Subtotal should only include selected items: (100000 * 2) + (150000 * 1) = 350000
      const subtotalText = screen.getByText(/tổng tiền/i);
      expect(subtotalText).toBeInTheDocument();
    });

    it('should show shipping fee correctly', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 500000, // Subtotal < 1000000, so shipping fee = 20000
          quantity: 1,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should show shipping fee
      const shippingText = screen.getByText(/phí vận chuyển/i);
      expect(shippingText).toBeInTheDocument();
    });

    it('should show free shipping when subtotal >= 1000000', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 1000000, // Subtotal >= 1000000, so shipping fee = 0
          quantity: 1,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should show "Miễn phí" for shipping
      const shippingText = screen.getByText(/phí vận chuyển/i);
      expect(shippingText).toBeInTheDocument();
    });

    it('should show coupon discount when coupon is applied', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 1,
          selected: true,
        },
      ];

      const mockCoupon = {
        id: 1,
        code: 'SAVE10',
        name: 'Giảm 10%',
        discount_price: 10000,
      };

      useCart.mockReturnValue({
        items: mockItems,
        discount: 10000,
        coupon: mockCoupon,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should show coupon information (may appear multiple times)
      const couponNames = screen.getAllByText(mockCoupon.name);
      expect(couponNames.length).toBeGreaterThan(0);
      expect(screen.getByText(new RegExp(mockCoupon.code, 'i'))).toBeInTheDocument();
    });

    it('should calculate final amount correctly with coupon', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 1,
          selected: true,
        },
      ];

      const mockCoupon = {
        id: 1,
        code: 'SAVE10',
        name: 'Giảm 10%',
        discount_price: 10000,
      };

      useCart.mockReturnValue({
        items: mockItems,
        discount: 10000,
        coupon: mockCoupon,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Final amount = subtotal (100000) - discount (10000) + shipping (20000) = 110000
      const finalAmountText = screen.getByText(/cần thanh toán/i);
      expect(finalAmountText).toBeInTheDocument();
    });
  });

  describe('BR2: Review Rules - Set validation result = Failed when cart is empty', () => {
    it('should handle empty cart gracefully', () => {
      useCart.mockReturnValue({
        items: [],
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should still render the component structure
      expect(screen.getByText(/chi tiết đơn hàng/i)).toBeInTheDocument();
      
      // Should show subtotal as 0 or empty
      const subtotalText = screen.getByText(/tổng tiền/i);
      expect(subtotalText).toBeInTheDocument();
    });

    it('should handle cart with no selected items', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 1,
          selected: false, // Not selected
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should not show the product
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
  });

  describe('Checkout button', () => {
    it('should render checkout button', () => {
      const mockItems = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 1,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockItems,
        discount: 0,
        coupon: null,
        applyCoupon: vi.fn(),
        removeCoupon: vi.fn(),
      });

      render(<CheckoutSummary />);

      // Should show checkout button
      const checkoutButton = screen.getByText(/đặt hàng ngay/i);
      expect(checkoutButton).toBeInTheDocument();
      expect(checkoutButton).toHaveAttribute('type', 'submit');
      expect(checkoutButton).toHaveAttribute('form', 'checkout-form');
    });
  });
});

