# 📊 Tóm tắt Migration API từ localhost sang Environment Variables

## ✅ Đã hoàn thành

### 1. **Setup Infrastructure**
- ✅ File `src/utils/api.js` đã tồn tại với cấu hình axios instance
- ✅ Sử dụng biến môi trường `VITE_API_BASE_URL`
- ✅ Fallback: `http://127.0.0.1:8000/api`

### 2. **Đã migrate thành công: src/components/Admin**

#### 📁 Blogs (2 files) ✅
- `src/components/Admin/Manage_Blogs/EditBlog.jsx`
- `src/components/Admin/Manage_Blogs/CreateBlog.jsx`

#### 👥 Users (4 files) ✅
- `src/components/Admin/Users/ManagerList/EditManager.jsx`
- `src/components/Admin/Users/ManagerList/CreateManager.jsx`
- `src/components/Admin/Users/CustomerList/EditCustomer.jsx`
- `src/components/Admin/Users/CustomerList/CreateCustomer.jsx`

#### 📦 Orders (6 files) ✅
- `src/components/Admin/Orders/AllProcessedOrders/Detail.jsx`
- `src/components/Admin/Orders/AllPendingOrders/Detail.jsx`
- `src/components/Admin/Orders/AllOutForDeliveryOrders/Detail.jsx`
- `src/components/Admin/Orders/AllOrders/Detail.jsx`
- `src/components/Admin/Orders/AllDeliveredOrders/Detail.jsx`
- `src/components/Admin/Orders/AllCanceledOrders/Detail.jsx`

#### 🛍️ Products (8 files) ✅
- `src/components/Admin/Manage_Products/Products/ProductVariants/ProductVariantsPage.jsx`
- `src/components/Admin/Manage_Products/Products/ProductVariants/EditProductVariants.jsx`
- `src/components/Admin/Manage_Products/Products/ProductVariants/CreateProductVariants.jsx`
- `src/components/Admin/Manage_Products/Products/ImageGallery/ImageGalleryPage.jsx`
- `src/components/Admin/Manage_Products/Products/ImageGallery/Table.jsx`
- `src/components/Admin/Manage_Products/Products/EditProduct.jsx`
- `src/components/Admin/Manage_Products/Products/CreateProduct.jsx`
- `src/pages/Admin/Products/ProductsPage.jsx`

#### 📂 Categories (8 files) ✅
- `src/components/Admin/Manage_Categories/Category/EditCategory.jsx`
- `src/components/Admin/Manage_Categories/Category/CreateCategory.jsx`
- `src/components/Admin/Manage_Categories/Features/EditFeature.jsx`
- `src/components/Admin/Manage_Categories/Features/CreateFeature.jsx`
- `src/components/Admin/Manage_Categories/Materials/EditMaterial.jsx`
- `src/components/Admin/Manage_Categories/Materials/CreateMaterial.jsx`
- `src/components/Admin/Manage_Categories/Shape/EditShape.jsx`
- `src/components/Admin/Manage_Categories/Shape/CreateShape.jsx`

#### 🏷️ Brands, Coupons, Branches ✅
- `src/components/Admin/Manage_Products/Brands/EditBrand.jsx`
- `src/components/Admin/Manage_Products/Brands/CreateBrand.jsx`
- `src/components/Admin/Coupons/EditCoupon.jsx`
- `src/components/Admin/Coupons/CreateCoupon.jsx`
- `src/components/Admin/Branches/EditBranch.jsx`
- `src/components/Admin/Branches/CreateBranch.jsx`

#### 📄 Pages ✅
- `src/pages/Admin/DashboardPage.jsx`
- `src/pages/Admin/ManageBlogsPage.jsx`
- `src/pages/Admin/Products/ProductsPage.jsx`

---

## ⏳ Còn lại cần migrate: src/pages/Admin (19 files)

### Danh sách files còn lại:

1. `src/pages/Admin/BannersPage.jsx` (3 localhost)
2. `src/pages/Admin/Users/ManagerListPage.jsx` (2 localhost)
3. `src/pages/Admin/Users/CustomerListPage.jsx` (2 localhost)
4. `src/pages/Admin/TransactionsPage.jsx` (2 localhost)
5. `src/pages/Admin/Products/Product_ReviewsPage.jsx` (3 localhost)
6. `src/pages/Admin/Products/BrandsPage.jsx` (2 localhost)
7. `src/pages/Admin/Orders/AllProcessedOrdersPage.jsx` (1 localhost)
8. `src/pages/Admin/Orders/AllPendingOrdersPage.jsx` (1 localhost)
9. `src/pages/Admin/Orders/AllOutForDeliveryOrdersPage.jsx` (1 localhost)
10. `src/pages/Admin/Orders/AllOrdersPage.jsx` (1 localhost)
11. `src/pages/Admin/Orders/AllDeliveredOrdersPage.jsx` (1 localhost)
12. `src/pages/Admin/Orders/AllCanceledOrdersPage.jsx` (1 localhost)
13. `src/pages/Admin/LoginPage.jsx`
14. `src/pages/Admin/CouponsPage.jsx` (2 localhost)
15. `src/pages/Admin/Categories/ShapePage.jsx` (2 localhost)
16. `src/pages/Admin/Categories/MaterialsPage.jsx` (2 localhost)
17. `src/pages/Admin/Categories/FeaturesPage.jsx` (2 localhost)
18. `src/pages/Admin/Categories/CategoryPage.jsx` (2 localhost)
19. `src/pages/Admin/BranchesPage.jsx` (3 localhost)

---

## 🔧 Hướng dẫn migrate các files còn lại

### Bước 1: Thay thế import

**Tìm:**
```javascript
import axios from 'axios';
```

**Thay bằng:**
```javascript
import api from '../../utils/api';
// hoặc
import api from '../../../utils/api';
// (tùy theo độ sâu của file)
```

### Bước 2: Thay thế API calls

**Tìm:**
```javascript
axios.get('http://localhost:8000/api/...')
axios.post('http://localhost:8000/api/...')
```

**Thay bằng:**
```javascript
api.get('/...')
api.post('/...')
```

### Bước 3: Xử lý fetch API (nếu có)

**Tìm:**
```javascript
fetch('http://localhost:8000/api/...', { method: 'POST', ... })
```

**Thay bằng:**
```javascript
api.post('/...', data, { headers: { ... } })
```

---

## 📝 Script tự động (khuyến nghị)

Bạn có thể dùng script sau để migrate nhanh:

```bash
# Tìm tất cả localhost còn lại
grep -r "localhost:8000" src/pages/Admin --include="*.jsx"

# Hoặc dùng find and replace trong VS Code:
# Find: import axios from 'axios';
# Replace: import api from '../../utils/api';
# (Adjust đường dẫn cho phù hợp)

# Find: axios\.(get|post|put|delete)\('http://localhost:8000/api/
# Replace: api.$1('/
```

---

## ✅ Testing Checklist

Sau khi migrate xong, kiểm tra:

- [ ] **Setup .env file**:
  ```env
  VITE_API_BASE_URL=https://your-api-domain.com/api
  ```

- [ ] **Test local development**:
  ```bash
  npm run dev
  ```

- [ ] **Test build**:
  ```bash
  npm run build
  npm run preview
  ```

- [ ] **Kiểm tra các chức năng chính**:
  - [ ] Login/Authentication
  - [ ] Dashboard data loading
  - [ ] CRUD operations (Create, Read, Update, Delete)
  - [ ] Image uploads
  - [ ] Search/Filter
  - [ ] Pagination

- [ ] **Kiểm tra Network tab** trong DevTools:
  - Tất cả API calls đều đến đúng URL (không còn localhost)
  - Response status codes đúng (200, 201, etc.)

---

## 🚀 Deploy to Azure

Sau khi migrate xong và test thành công:

1. **Cập nhật GitHub Secrets**:
   - `VITE_API_BASE_URL`: URL production API của bạn

2. **Push code lên GitHub**:
   ```bash
   git add .
   git commit -m "refactor: migrate API calls to environment variables"
   git push origin main
   ```

3. **Theo dõi deployment**:
   - Vào GitHub Actions tab
   - Kiểm tra workflow logs
   - Verify trên Azure Static Web App URL

---

## 📊 Thống kê

- **Tổng files đã migrate**: 35+ files
- **Tổng localhost đã xóa**: 53+ occurrences trong components
- **Files còn lại**: 19 files trong pages
- **Ước tính thời gian còn lại**: 15-20 phút (nếu làm thủ công)

---

## 💡 Best Practices

### ✅ DO:
- Sử dụng `api` instance từ `src/utils/api.js`
- Kiểm tra đường dẫn tương đối khi import
- Test từng chức năng sau khi migrate
- Sử dụng environment variables cho tất cả URLs
- Clear cache trước khi test: `rm -rf node_modules/.vite`

### ❌ DON'T:
- Hardcode URLs trực tiếp trong code
- Quên thay đổi import statement
- Bỏ qua testing trước khi push
- Commit `.env` file lên Git

---

## 🆘 Troubleshooting

### Lỗi: "Cannot find module 'api'"
**Nguyên nhân**: Đường dẫn import sai

**Giải pháp**:
```javascript
// Kiểm tra file structure:
// src/pages/Admin/SomePage.jsx → import api from '../../utils/api';
// src/pages/Admin/SubFolder/SomePage.jsx → import api from '../../../utils/api';
```

### Lỗi: API calls fail với 404
**Nguyên nhân**: URL không đúng hoặc thiếu `/api` prefix

**Giải pháp**:
```javascript
// Đảm bảo baseURL trong api.js đúng:
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

// API calls chỉ cần path:
api.get('/products') // → http://127.0.0.1:8000/api/products
```

### Lỗi: Environment variables undefined
**Nguyên nhân**: Chưa restart dev server sau khi thay đổi .env

**Giải pháp**:
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

**📅 Created**: $(date)
**👤 By**: AI Assistant
**🎯 Status**: **35 files migrated**, **19 files remaining**

