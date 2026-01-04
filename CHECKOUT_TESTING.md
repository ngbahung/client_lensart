# Checkout Testing Guide

## Test Files Created

### 1. `src/api/__tests__/checkoutAPI.test.js`
Unit tests cho checkout API functions:
- `createOrder` - 3 test cases
- `createPayOSCheckout` - 2 test cases  
- `updatePaymentStatus` - 2 test cases

**Total: 7 test cases**

### 2. `src/components/EndUser/Checkout/__tests__/CheckoutForm.test.jsx`
Component tests cho CheckoutForm:
- Checkout with valid cart, shipping info, and payment method - 2 tests
- Attempt checkout with empty cart - 1 test
- Checkout with missing required shipping fields - 2 tests
- Checkout without selecting payment method - 1 test
- Checkout with item exceeding branch stock - 2 tests

**Total: 8 test cases**

### 3. `src/pages/EndUser/__tests__/CheckOutPage.test.jsx`
Page-level tests cho CheckOutPage:
- Checkout with valid cart - 1 test
- Attempt checkout with empty cart - 3 tests
- Loading state - 1 test
- Page structure - 1 test

**Total: 6 test cases**

## Test Cases Coverage

### ✅ Checkout with valid cart, shipping info, and payment method
- **Test**: `should successfully submit checkout with COD payment`
- **Test**: `should successfully submit checkout with PayOS payment`
- **Coverage**: 
  - Form renders correctly
  - User data loads
  - Payment methods can be selected
  - Form structure is correct

### ✅ Attempt checkout with empty cart
- **Test**: `should handle empty cart scenario` (CheckoutForm)
- **Test**: `should redirect to cart page when no items are selected` (CheckOutPage)
- **Test**: `should redirect when cart has items but none are selected` (CheckOutPage)
- **Test**: `should show error toast for quick buy when cart is empty` (CheckOutPage)
- **Coverage**:
  - Empty cart handling
  - Redirect logic
  - Error messages

### ✅ Checkout with missing required shipping fields
- **Test**: `should have required fields in form`
- **Test**: `should show required field labels`
- **Coverage**:
  - Required field validation
  - Form structure
  - Field labels

### ✅ Checkout without selecting payment method
- **Test**: `should use default COD payment method`
- **Coverage**:
  - Default payment method (COD)
  - Payment method selection

### ✅ Checkout with item exceeding branch stock
- **Test**: `should handle error when order creation fails due to insufficient stock`
- **Test**: `should handle API error response format`
- **Coverage**:
  - Error handling for stock issues
  - API error format handling

## Running Tests

```bash
# Run all checkout tests
npm test -- --run checkout

# Run specific test file
npm test -- --run checkoutAPI.test.js
npm test -- --run CheckoutForm.test.jsx
npm test -- --run CheckOutPage.test.jsx

# Run with coverage
npm run test:coverage
```

## Test Results

✅ **All 52 tests passed**
- checkoutAPI.test.js: 7 tests passed
- CheckoutForm.test.jsx: 8 tests passed
- CheckOutPage.test.jsx: 6 tests passed
- Other existing tests: 31 tests passed

## Notes

1. **Form Submission**: Submit button is in `CheckoutSummary` component, not `CheckoutForm`. Tests verify form structure and validation.

2. **HTML5 Validation**: Browser's native HTML5 validation prevents form submission when required fields are missing. Tests verify form structure rather than actual submission.

3. **Integration Tests**: For full end-to-end testing of checkout flow with form submission, integration tests would be recommended.

4. **Mocking**: All external dependencies are mocked:
   - API calls (checkoutAPI, userAPI, locationApi)
   - Context providers (CartContext)
   - Navigation (react-router-dom)
   - Toast notifications

## Future Enhancements

- Integration tests for complete checkout flow
- Tests for coupon application during checkout
- Tests for shipping fee calculation
- Tests for order summary calculations

