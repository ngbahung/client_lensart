# 🌐 App URL Optimization - Environment Variables

## 🎯 Vấn đề đã giải quyết

**Trước đây:**
```javascript
// Hardcoded localhost trong checkoutAPI.js
returnUrl: "http://localhost:5173/order-success",
cancelUrl: "http://localhost:5173/gio-hang",
// ❌ Port 5173 không khớp với vite.config.js (port 3000)
```

**Vấn đề:**
- ❌ Không hoạt động khi deploy lên staging/production
- ❌ Payment callback sẽ redirect về localhost (không tồn tại)
- ❌ Phải sửa code mỗi khi deploy môi trường khác
- ❌ Khó test payment flow trên các môi trường khác nhau

---

## ✅ Giải pháp đã áp dụng

### 1. Environment Variable: `VITE_APP_URL`

Thêm biến môi trường mới để lưu frontend URL:

```env
VITE_APP_URL=http://localhost:3000
```

### 2. Dynamic URL trong checkoutAPI.js

**File: `src/api/checkoutAPI.js`**

```javascript
export const createPayOSCheckout = async (orderId, shipping_fee) => {
  try {
    // ✅ Get base URL from environment variable
    // Development: localhost:3000 (matching vite.config.js)
    // Production/Azure: VITE_APP_URL from env or window.location.origin
    const baseUrl = import.meta.env.VITE_APP_URL || 
                    (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin);
    
    const response = await api.post(`/transactions/orders/${orderId}/create`, {
      returnUrl: `${baseUrl}/order-success`,
      cancelUrl: `${baseUrl}/gio-hang`,
      shipping_fee: shipping_fee
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
```

---

## 📁 Files đã thay đổi

### 1. **`src/api/checkoutAPI.js`** ✅
- Thay hardcoded URLs bằng dynamic URLs
- Sử dụng `import.meta.env.VITE_APP_URL`
- Fallback: `http://localhost:3000` (dev) hoặc `window.location.origin` (production)

### 2. **`.env.example`** ✅ NEW
- Template cho environment variables
- Documentation đầy đủ
- Examples cho dev/staging/production

### 3. **`.github/workflows/azure-static-web-apps.yml`** ✅
- Thêm `VITE_APP_URL` vào build environment
- Staging: `VITE_APP_URL_STAGING`
- Production: `VITE_APP_URL`

---

## 🔧 Setup Instructions

### 1. Local Development

**Tạo file `.env` (hoặc `.env.development`):**

```env
# API Backend
VITE_API_BASE_URL=http://localhost:8000/api

# Frontend URL (for payment callbacks)
VITE_APP_URL=http://localhost:3000

# App Info
VITE_APP_ENV=development
VITE_APP_NAME=LensArt (Dev)
VITE_APP_VERSION=1.0.0
```

**Restart dev server:**
```bash
npm run dev
```

---

### 2. Staging Environment

**Option A: GitHub Secrets (Recommended)**

Vào: **GitHub repo → Settings → Secrets and variables → Actions**

```
Name: VITE_APP_URL_STAGING
Value: https://your-staging-domain.azurestaticapps.net
```

**Option B: Azure Configuration**

Vào: **Azure Static Web App → Configuration → Application settings**

```
Name: VITE_APP_URL
Value: https://your-staging-domain.azurestaticapps.net
```

---

### 3. Production Environment

**GitHub Secrets:**

```
Name: VITE_APP_URL
Value: https://your-production-domain.com
```

hoặc nếu dùng Azure default URL:

```
Value: https://your-app.azurestaticapps.net
```

---

## 🎯 Use Cases

### Payment Gateway Integration

**PayOS, VNPay, MoMo, etc. require:**
- ✅ **returnUrl**: URL to redirect after successful payment
- ✅ **cancelUrl**: URL to redirect if user cancels

**Example:**
```javascript
const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

// Development
returnUrl: "http://localhost:3000/order-success"

// Staging
returnUrl: "https://staging.lensart.com/order-success"

// Production
returnUrl: "https://lensart.com/order-success"
```

### OAuth Callbacks

Nếu có OAuth (Google, Facebook login):

```javascript
const redirectUri = `${import.meta.env.VITE_APP_URL}/auth/callback`;
```

### Share URLs

```javascript
const shareUrl = `${import.meta.env.VITE_APP_URL}/products/${productId}`;
```

---

## 📊 Environment Configuration Matrix

| Environment | VITE_API_BASE_URL | VITE_APP_URL | VITE_APP_ENV |
|-------------|-------------------|--------------|--------------|
| **Development** | `http://localhost:8000/api` | `http://localhost:3000` | `development` |
| **Staging** | `https://staging-api.azurewebsites.net/api` | `https://staging-app.azurestaticapps.net` | `staging` |
| **Production** | `https://api.azurewebsites.net/api` | `https://lensart.com` | `production` |

---

## ✅ Testing Checklist

### Local Testing

```bash
# 1. Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_URL=http://localhost:3000
VITE_APP_ENV=development
VITE_APP_NAME=LensArt
EOF

# 2. Restart dev server
npm run dev

# 3. Test payment flow
# - Add items to cart
# - Go to checkout
# - Initiate payment
# - Check returnUrl and cancelUrl in network tab
```

### Staging Testing

```bash
# 1. Set GitHub secret: VITE_APP_URL_STAGING

# 2. Push to main branch
git push origin main

# 3. Wait for deployment

# 4. Test payment on staging URL
# - Verify returnUrl points to staging domain
# - Complete test payment
# - Check if redirects work correctly
```

### Production Testing

```bash
# 1. Set GitHub secret: VITE_APP_URL

# 2. Manually trigger production deployment

# 3. Test payment flow
# - Verify returnUrl points to production domain
# - Test with real payment (small amount)
# - Verify callbacks work correctly
```

---

## 🔍 Debugging

### Check Environment Variable

```javascript
// In browser console or in code
console.log('App URL:', import.meta.env.VITE_APP_URL);
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
console.log('Environment:', import.meta.env.VITE_APP_ENV);
```

### Verify Build Output

```bash
npm run build

# Check dist/assets/*.js for the URLs
# Search for "order-success" or "gio-hang"
```

### Network Tab

1. Open DevTools → Network tab
2. Go to checkout and create payment
3. Find POST request to `/transactions/orders/{id}/create`
4. Check Request Payload:
   ```json
   {
     "returnUrl": "https://your-domain.com/order-success",
     "cancelUrl": "https://your-domain.com/gio-hang",
     "shipping_fee": 30000
   }
   ```

---

## 🆘 Troubleshooting

### Issue: Payment redirects to localhost after deployment

**Cause:** `VITE_APP_URL` not set in production

**Solution:**
```bash
# Add GitHub secret
VITE_APP_URL=https://your-production-domain.com

# Rebuild and redeploy
```

### Issue: Environment variable is undefined

**Cause:** Forgot to restart dev server

**Solution:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Wrong URL in production build

**Cause:** Built with wrong environment or secret not set

**Solution:**
```bash
# Verify secrets are set
# GitHub repo → Settings → Secrets

# Check workflow file has env variable
# .github/workflows/azure-static-web-apps.yml

# Trigger new deployment
```

---

## 🎓 Best Practices

### 1. ✅ Always use environment variables for URLs
```javascript
// ✅ Good
const baseUrl = import.meta.env.VITE_APP_URL;

// ❌ Bad
const baseUrl = "http://localhost:5173";
```

### 2. ✅ Provide fallback values
```javascript
// ✅ Good - has fallback for local dev
const baseUrl = import.meta.env.VITE_APP_URL || 
                (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin);

// ❌ Bad - will break if env not set
const baseUrl = import.meta.env.VITE_APP_URL;
```

### 3. ✅ Use consistent variable naming
```javascript
// ✅ Good - clear naming
VITE_APP_URL          // Frontend URL
VITE_API_BASE_URL     // Backend API URL

// ❌ Bad - confusing
VITE_URL              // Which URL?
VITE_BASE             // Base of what?
```

### 4. ✅ Document all variables
```javascript
// In .env.example with comments
# Frontend app URL (for payment callbacks, OAuth, etc.)
# Development: http://localhost:3000 (matching vite.config.js)
# Production: https://your-domain.azurestaticapps.net
VITE_APP_URL=http://localhost:3000
```

---

## 📊 Before vs After

### Before:
```
❌ Hardcoded localhost:5173 in source code (port mismatch with vite.config.js)
❌ Payment callbacks fail on production
❌ Must edit code for each environment
❌ Difficult to test payment flow
```

### After:
```
✅ Dynamic URLs from environment variables
✅ Payment callbacks work on all environments
✅ Just change .env or GitHub secrets
✅ Easy to test on any environment
✅ Same code works everywhere
```

---

## 📝 Related Files

- `src/api/checkoutAPI.js` - Payment API calls
- `.env.example` - Environment variables template
- `.github/workflows/azure-static-web-apps.yml` - CI/CD workflow
- `AZURE_DEPLOYMENT.md` - Deployment documentation

---

## 🚀 Next Steps

### 1. Setup Local Environment
```bash
cp .env.example .env
# Edit .env with your values
npm run dev
```

### 2. Setup GitHub Secrets
```
VITE_API_BASE_URL
VITE_APP_URL
VITE_APP_URL_STAGING (optional)
```

### 3. Test Payment Flow
- Local → Staging → Production
- Verify all callbacks work

### 4. Deploy
```bash
git add .
git commit -m "feat: use environment variables for app URL in payment callbacks"
git push origin main
```

---

**Status**: ✅ **COMPLETED**  
**Impact**: 🚀 **High - Enables proper payment flow on all environments**  
**Breaking Changes**: ❌ **NO - Backward compatible with fallback**

---

> 💡 **Pro Tip**: Always test payment flow on staging before deploying to production!

