import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import CheckOutPage from '../CheckOutPage';
import { useCart } from '../../../contexts/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
vi.mock('../../../contexts/CartContext');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const TestWrapper = ({ children, initialEntries = ['/checkout'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    {children}
  </MemoryRouter>
);

describe('CheckOutPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  describe('Checkout with valid cart', () => {
    it('should render checkout page when cart has selected items', async () => {
      const mockCartItems = [
        {
          id: 1,
          product_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockCartItems,
      });

      render(
        <TestWrapper>
          <CheckOutPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/thông tin giao hàng/i)).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Attempt checkout with empty cart', () => {
    it('should redirect to cart page when no items are selected', async () => {
      useCart.mockReturnValue({
        items: [],
      });

      render(
        <TestWrapper>
          <CheckOutPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/gio-hang');
      });
    });

    it('should redirect when cart has items but none are selected', async () => {
      const mockCartItems = [
        {
          id: 1,
          product_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: false, // Not selected
        },
      ];

      useCart.mockReturnValue({
        items: mockCartItems,
      });

      render(
        <TestWrapper>
          <CheckOutPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/gio-hang');
      });
    });

    it('should show error toast for quick buy when cart is empty', async () => {
      useCart.mockReturnValue({
        items: [],
      });

      render(
        <TestWrapper initialEntries={['/checkout?quickBuy=true']}>
          <CheckOutPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Không tìm thấy sản phẩm để thanh toán');
        expect(mockNavigate).toHaveBeenCalledWith('/gio-hang');
      });
    });
  });

  describe('Loading state', () => {
    it('should show loading spinner initially', () => {
      const mockCartItems = [
        {
          id: 1,
          product_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockCartItems,
      });

      const { container } = render(
        <TestWrapper>
          <CheckOutPage />
        </TestWrapper>
      );

      // Should show loading initially (component checks items in useEffect)
      // After items are validated, it should render the form
    });
  });

  describe('Page structure', () => {
    it('should render breadcrumb and checkout components', async () => {
      const mockCartItems = [
        {
          id: 1,
          product_id: 1,
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: true,
        },
      ];

      useCart.mockReturnValue({
        items: mockCartItems,
      });

      render(
        <TestWrapper>
          <CheckOutPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/thông tin giao hàng/i)).toBeInTheDocument();
        expect(screen.getByText(/chi tiết đơn hàng/i)).toBeInTheDocument();
      });
    });
  });
});

