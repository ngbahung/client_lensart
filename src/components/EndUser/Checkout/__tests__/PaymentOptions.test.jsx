import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentOptions from '../PaymentOptions';

describe('PaymentOptions - BR4: Payment Selection Rules', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('BR4: Payment Selection Rules - If user selects a payment method', () => {
    it('should render both payment methods', () => {
      render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      expect(screen.getByText(/thanh toán khi nhận hàng/i)).toBeInTheDocument();
      expect(screen.getByText(/thanh toán bằng chuyển khoản/i)).toBeInTheDocument();
    });

    it('should call onChange when COD method is clicked', () => {
      render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      const codOption = screen.getByText(/thanh toán khi nhận hàng/i).closest('div');
      fireEvent.click(codOption);

      expect(mockOnChange).toHaveBeenCalledWith('cod');
    });

    it('should call onChange when PayOS method is clicked', () => {
      render(<PaymentOptions selected="payos" onChange={mockOnChange} />);

      const payOSOption = screen.getByText(/thanh toán bằng chuyển khoản/i).closest('div');
      fireEvent.click(payOSOption);

      expect(mockOnChange).toHaveBeenCalledWith('payos');
    });

    it('should highlight selected payment method', () => {
      const { container, rerender } = render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      // Find the parent div with border classes
      const codOption = screen.getByText(/thanh toán khi nhận hàng/i).closest('.border');
      expect(codOption).toHaveClass('border-orange-500', 'bg-orange-50');

      rerender(<PaymentOptions selected="payos" onChange={mockOnChange} />);

      const payOSOption = screen.getByText(/thanh toán bằng chuyển khoản/i).closest('.border');
      expect(payOSOption).toHaveClass('border-orange-500', 'bg-orange-50');
    });

    it('should show radio button indicator for selected method', () => {
      const { container } = render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      // Check for radio button indicator (the filled circle with bg-orange-500)
      const radioIndicators = container.querySelectorAll('.bg-orange-500');
      expect(radioIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('BR4: Payment Selection Rules - Payment method validation', () => {
    it('should have valid payment method IDs', () => {
      render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      // Both methods should be available
      expect(screen.getByText(/thanh toán khi nhận hàng/i)).toBeInTheDocument();
      expect(screen.getByText(/thanh toán bằng chuyển khoản/i)).toBeInTheDocument();
    });

    it('should handle payment method change correctly', () => {
      const { rerender } = render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      // Initially COD is selected - find parent div with border classes
      const codOption = screen.getByText(/thanh toán khi nhận hàng/i).closest('.border');
      expect(codOption).toHaveClass('border-orange-500');

      // Change to PayOS
      const payOSOption = screen.getByText(/thanh toán bằng chuyển khoản/i).closest('.border');
      fireEvent.click(payOSOption);

      expect(mockOnChange).toHaveBeenCalledWith('payos');

      // Rerender with new selection
      rerender(<PaymentOptions selected="payos" onChange={mockOnChange} />);

      // Now PayOS should be selected
      const updatedPayOSOption = screen.getByText(/thanh toán bằng chuyển khoản/i).closest('.border');
      expect(updatedPayOSOption).toHaveClass('border-orange-500');
    });
  });

  describe('Payment method descriptions', () => {
    it('should show payment method descriptions', () => {
      render(<PaymentOptions selected="cod" onChange={mockOnChange} />);

      expect(screen.getByText(/thanh toán bằng tiền mặt khi nhận hàng/i)).toBeInTheDocument();
      expect(screen.getByText(/thanh toán online qua cổng thanh toán payos/i)).toBeInTheDocument();
    });
  });
});

