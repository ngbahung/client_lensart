/**
 * BR2: Review Rules - Group cart items by branch
 * Utility functions for checkout business rules
 */

/**
 * Group cart items by branch with subtotals
 * @param {Array} items - Cart items
 * @returns {Object} Items grouped by branch with subtotals
 */
export const groupCartItemsByBranch = (items) => {
  if (!items || items.length === 0) {
    return {
      validation_result: 'Failed',
      message: 'Cart is empty',
      groups: []
    };
  }

  // Group by branch_id
  const grouped = items.reduce((acc, item) => {
    const branchId = item.branch_id;
    if (!acc[branchId]) {
      acc[branchId] = {
        branch_id: branchId,
        branch_name: item.branch_name || 'N/A',
        items: [],
        subtotal: 0
      };
    }
    acc[branchId].items.push(item);
    acc[branchId].subtotal += (item.price || 0) * (item.quantity || 0);
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return {
    validation_result: 'Successful',
    groups: groups
  };
};

/**
 * Validate checkout data
 * @param {Array} items - Cart items
 * @param {Object} shippingData - Shipping information
 * @param {string} paymentMethod - Payment method
 * @returns {Object} Validation result
 */
export const validateCheckoutData = (items, shippingData, paymentMethod) => {
  // Check if cart is empty
  const selectedItems = items.filter(item => item.selected);
  if (!selectedItems || selectedItems.length === 0) {
    return {
      validation_result: 'Failed',
      message: 'Cart is empty'
    };
  }

  // Check shipping address
  if (!shippingData || !shippingData.address || !shippingData.address.trim()) {
    return {
      validation_result: 'Failed',
      message: 'Shipping address is required'
    };
  }

  // Check payment method
  if (!paymentMethod) {
    return {
      validation_result: 'Failed',
      message: 'Payment method is required'
    };
  }

  const validPaymentMethods = ['cod', 'payos'];
  if (!validPaymentMethods.includes(paymentMethod)) {
    return {
      validation_result: 'Failed',
      message: 'Invalid payment method'
    };
  }

  return {
    validation_result: 'Successful'
  };
};

