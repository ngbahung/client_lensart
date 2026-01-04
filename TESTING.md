# Testing Guide - Add to Cart Feature

## Setup

### 1. Install Dependencies

```bash
npm install
```

Các dependencies cần thiết đã được thêm vào `package.json`:
- `vitest` - Testing framework
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for tests
- `@vitest/ui` - UI for running tests

### 2. Run Tests

```bash
# Chạy tất cả tests
npm test

# Chạy tests với UI
npm run test:ui

# Chạy tests với coverage report
npm run test:coverage

# Chạy tests trong watch mode
npm test -- --watch

# Chạy một test file cụ thể
npm test -- cartAPI.test.js
```

## Test Files

### 1. `src/api/__tests__/cartAPI.test.js`
Unit tests cho các API functions:
- `createCartDetail` - Thêm sản phẩm vào giỏ hàng
- `getCartDetails` - Lấy danh sách sản phẩm trong giỏ hàng
- `updateCartItemQuantity` - Cập nhật số lượng
- `deleteCartItem` - Xóa sản phẩm khỏi giỏ hàng

**Test Cases:**
- ✅ Thêm sản phẩm thành công
- ✅ Xử lý lỗi API (số lượng không đủ, network error)
- ✅ Xử lý null color cho lens products
- ✅ Các tham số khác nhau

### 2. `src/contexts/__tests__/CartContext.test.jsx`
Unit tests cho CartContext và addToCart function:
- `addToCart` function
- Cart reducer
- State management
- Integration với API

**Test Cases:**
- ✅ Thêm sản phẩm thành công
- ✅ Xử lý khi user chưa đăng nhập
- ✅ Xử lý lỗi API
- ✅ Quick buy flow
- ✅ Null color cho lens products
- ✅ Fetch cart on mount
- ✅ Không fetch cart trong admin context

### 3. `src/components/EndUser/ProductDetails/__tests__/ProductDetail.test.jsx`
Component tests cho ProductDetail component:
- User interactions
- Validation
- Error handling
- Quick buy flow

**Test Cases:**
- ✅ Click add to cart button
- ✅ Validation khi chưa đăng nhập
- ✅ Validation khi chưa chọn chi nhánh
- ✅ Validation khi chưa chọn màu sắc
- ✅ Không yêu cầu màu cho lens products
- ✅ Validation số lượng
- ✅ Xử lý lỗi
- ✅ Quick buy flow
- ✅ Disable button khi đang thêm

## Test Structure

```
src/
├── api/
│   └── __tests__/
│       └── cartAPI.test.js
├── contexts/
│   └── __tests__/
│       └── CartContext.test.jsx
├── components/
│   └── EndUser/
│       └── ProductDetails/
│           └── __tests__/
│               └── ProductDetail.test.jsx
└── test/
    └── setup.js
```

## Mocking

Tests sử dụng mocks cho:
- API calls (`cartAPI.js`)
- Context providers (`AuthContext`, `CartContext`)
- External libraries (`react-toastify`, `react-router-dom`)
- Browser APIs (`localStorage`, `window.location`)

## Coverage Goals

- **API Layer**: 100% coverage cho cartAPI functions
- **Context Layer**: >90% coverage cho CartContext
- **Component Layer**: >80% coverage cho critical user flows

## Best Practices

1. **Isolation**: Mỗi test phải độc lập, không phụ thuộc vào test khác
2. **Mocking**: Mock tất cả external dependencies
3. **Assertions**: Sử dụng descriptive assertions
4. **Cleanup**: Cleanup sau mỗi test
5. **Async**: Sử dụng `waitFor` cho async operations

## Troubleshooting

### Tests fail với "Cannot find module"
- Đảm bảo đã chạy `npm install`
- Kiểm tra đường dẫn import trong test files

### Tests fail với "localStorage is not defined"
- Đã được xử lý trong `src/test/setup.js`
- Nếu vẫn lỗi, kiểm tra mock setup

### Tests fail với "window.matchMedia is not defined"
- Đã được xử lý trong `src/test/setup.js`
- Nếu vẫn lỗi, kiểm tra mock setup

## Continuous Integration

Tests có thể được chạy trong CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test -- --run
```

