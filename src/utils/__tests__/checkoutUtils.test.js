import { describe, it, expect } from 'vitest';
import { groupCartItemsByBranch, validateCheckoutData } from '../checkoutUtils';

describe('Checkout Utils - BR2: Review Rules', () => {
  describe('groupCartItemsByBranch', () => {
    it('should return failed validation when cart is empty', () => {
      const result = groupCartItemsByBranch([]);
      
      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Cart is empty');
      expect(result.groups).toEqual([]);
    });

    it('should return failed validation when items is null', () => {
      const result = groupCartItemsByBranch(null);
      
      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Cart is empty');
    });

    it('should group items by branch with subtotals', () => {
      const items = [
        {
          id: 1,
          product_id: 1,
          branch_id: 1,
          branch_name: 'Branch 1',
          name: 'Product 1',
          price: 100000,
          quantity: 2,
          selected: true
        },
        {
          id: 2,
          product_id: 2,
          branch_id: 1,
          branch_name: 'Branch 1',
          name: 'Product 2',
          price: 150000,
          quantity: 1,
          selected: true
        },
        {
          id: 3,
          product_id: 3,
          branch_id: 2,
          branch_name: 'Branch 2',
          name: 'Product 3',
          price: 200000,
          quantity: 1,
          selected: true
        }
      ];

      const result = groupCartItemsByBranch(items);

      expect(result.validation_result).toBe('Successful');
      expect(result.groups).toHaveLength(2);

      // Check Branch 1
      const branch1 = result.groups.find(g => g.branch_id === 1);
      expect(branch1).toBeDefined();
      expect(branch1.branch_name).toBe('Branch 1');
      expect(branch1.items).toHaveLength(2);
      expect(branch1.subtotal).toBe(350000); // 100000 * 2 + 150000 * 1

      // Check Branch 2
      const branch2 = result.groups.find(g => g.branch_id === 2);
      expect(branch2).toBeDefined();
      expect(branch2.branch_name).toBe('Branch 2');
      expect(branch2.items).toHaveLength(1);
      expect(branch2.subtotal).toBe(200000);
    });

    it('should handle items with missing price or quantity', () => {
      const items = [
        {
          id: 1,
          branch_id: 1,
          branch_name: 'Branch 1',
          price: 100000,
          // quantity missing
        },
        {
          id: 2,
          branch_id: 1,
          branch_name: 'Branch 1',
          // price missing
          quantity: 2
        }
      ];

      const result = groupCartItemsByBranch(items);

      expect(result.validation_result).toBe('Successful');
      const branch1 = result.groups[0];
      expect(branch1.subtotal).toBe(0); // 100000 * 0 + 0 * 2
    });
  });

  describe('validateCheckoutData - BR5: Checkout Validation Rules', () => {
    it('should return failed when cart is empty', () => {
      const items = [];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = 'cod';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Cart is empty');
    });

    it('should return failed when no items are selected', () => {
      const items = [
        { id: 1, selected: false },
        { id: 2, selected: false }
      ];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = 'cod';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Cart is empty');
    });

    it('should return failed when shipping address is missing', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = {};
      const paymentMethod = 'cod';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Shipping address is required');
    });

    it('should return failed when shipping address is empty string', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = { address: '   ' };
      const paymentMethod = 'cod';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Shipping address is required');
    });

    it('should return failed when payment method is missing', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = null;

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Payment method is required');
    });

    it('should return failed when payment method is invalid', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = 'invalid_method';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Failed');
      expect(result.message).toBe('Invalid payment method');
    });

    it('should return successful when all data is valid', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = 'cod';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Successful');
    });

    it('should return successful with payos payment method', () => {
      const items = [{ id: 1, selected: true }];
      const shippingData = { address: '123 Test Street' };
      const paymentMethod = 'payos';

      const result = validateCheckoutData(items, shippingData, paymentMethod);

      expect(result.validation_result).toBe('Successful');
    });
  });
});
