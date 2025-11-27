# ✅ Environment Setup - Tóm tắt cấu hình

## 📋 Những gì đã được cấu hình

### 1. ✅ Files đã tạo

```
✓ .env                              ← Config local của bạn
✓ .env.development                  ← Config cho môi trường development
✓ .env.staging                      ← Config cho môi trường staging
✓ .env.production                   ← Config cho môi trường production
✓ .env.example                      ← Template mẫu (được commit vào git)
✓ .github/workflows/azure-static-web-apps.yml  ← GitHub Actions workflow
✓ AZURE_DEPLOYMENT.md              ← Hướng dẫn deploy chi tiết
✓ ENV_SETUP.md                     ← Hướng dẫn sử dụng environment variables
```

### 2. ✅ Đã cập nhật

```
✓ .gitignore                       ← Thêm các file .env vào ignore
✓ src/utils/api.js                 ← Sử dụng biến môi trường cho baseURL
✓ package.json                     ← Thêm script preview:staging
```

### 3. ✅ Cấu hình tự động

- ✅ GitHub Actions workflow cho auto-deployment
- ✅ Support nhiều môi trường (dev, staging, production)
- ✅ Build optimization với code splitting
- ✅ Security headers đã được cấu hình

---

## 🚀 Các bước tiếp theo

### Bước 1: Cấu hình API URL

Mở file `.env` và cập nhật URL API của bạn:

```bash
# Mở file .env
notepad .env

# Hoặc sử dụng editor khác
code .env
```

Sửa dòng:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Thành URL API thật của bạn.

### Bước 2: Test local

```bash
# Install dependencies (nếu chưa)
npm install

# Start development server
npm run dev

# Kiểm tra console để đảm bảo API URL đúng
```

### Bước 3: Chuẩn bị deploy lên Azure

1. **Đọc hướng dẫn deploy**:
   ```bash
   # Xem file hướng dẫn
   code AZURE_DEPLOYMENT.md
   ```

2. **Cập nhật URL API cho Staging và Production**:
   ```bash
   # Sửa .env.staging
   code .env.staging
   
   # Sửa .env.production
   code .env.production
   ```

3. **Setup Azure Static Web App**:
   - Làm theo hướng dẫn trong `AZURE_DEPLOYMENT.md`
   - Tạo Static Web App trên Azure Portal
   - Lấy deployment token
   - Add vào GitHub Secrets

4. **Commit và Push**:
   ```bash
   git add .
   git commit -m "Setup environment variables and Azure deployment"
   git push origin main
   ```

---

## 📝 Cấu trúc Environment Variables

### Biến môi trường hiện tại:

```env
VITE_API_BASE_URL      # URL của Backend API
VITE_APP_ENV           # development / staging / production
VITE_APP_NAME          # Tên ứng dụng
VITE_APP_VERSION       # Version hiện tại
```

### Sử dụng trong code:

```javascript
// Trong component React
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const environment = import.meta.env.VITE_APP_ENV;

console.log('API URL:', apiUrl);
console.log('Environment:', environment);
```

### Đã được sử dụng trong:

```javascript
// src/utils/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
});
```

---

## 🔐 Security

### ✅ Đã được bảo vệ:

- ✅ Tất cả `.env*` files đã được thêm vào `.gitignore`
- ✅ Chỉ `.env.example` được commit vào git
- ✅ GitHub Secrets để lưu trữ sensitive data
- ✅ Security headers đã được cấu hình trong `staticwebapp.config.json`

### ⚠️ Lưu ý quan trọng:

1. **KHÔNG BAO GIỜ commit các file .env thật**
2. **Environment variables có thể nhìn thấy trong browser**
   - Không lưu passwords, API keys nhạy cảm
   - Chỉ lưu public configuration
3. **Luôn sử dụng HTTPS cho production**

---

## 📦 NPM Scripts mới

```json
{
  "dev": "vite --mode development",
  "build": "vite build --mode production",
  "build:staging": "vite build --mode staging",
  "build:dev": "vite build --mode development",
  "preview": "vite preview",
  "preview:production": "vite build --mode production && vite preview",
  "preview:staging": "vite build --mode staging && vite preview"
}
```

### Cách sử dụng:

```bash
# Development
npm run dev                    # Chạy dev server với .env.development

# Build
npm run build                  # Build production với .env.production
npm run build:staging          # Build staging với .env.staging
npm run build:dev              # Build development với .env.development

# Preview
npm run preview                # Preview build mặc định
npm run preview:production     # Build và preview production
npm run preview:staging        # Build và preview staging
```

---

## 🌍 Môi trường Deploy

### 📍 Development (Local)

```
Environment: development
URL: http://localhost:3000
API: http://127.0.0.1:8000/api
```

### 📍 Staging (Azure)

```
Environment: staging
URL: https://your-app-staging.azurestaticapps.net
API: https://your-staging-api.azurewebsites.net/api
Branch: staging
```

### 📍 Production (Azure)

```
Environment: production
URL: https://your-app.azurestaticapps.net
API: https://your-production-api.azurewebsites.net/api
Branch: main
```

---

## 🔄 Workflow tự động

### Khi push code:

```
Push to main branch
    ↓
GitHub Actions trigger
    ↓
Build with production config
    ↓
Deploy to Azure Static Web Apps (Production)
    ↓
Live at: https://your-app.azurestaticapps.net

---

Push to staging branch
    ↓
GitHub Actions trigger
    ↓
Build with staging config
    ↓
Deploy to Azure Static Web Apps (Staging)
    ↓
Live at: https://your-app-staging.azurestaticapps.net
```

---

## 📚 Tài liệu tham khảo

1. **ENV_SETUP.md** - Hướng dẫn chi tiết về environment variables
2. **AZURE_DEPLOYMENT.md** - Hướng dẫn deploy lên Azure
3. **.env.example** - Template cho environment variables

---

## ❓ Troubleshooting

### Environment variables không hoạt động?

```bash
# 1. Kiểm tra tên biến phải bắt đầu với VITE_
echo $env:VITE_API_BASE_URL

# 2. Restart dev server
# Dừng server (Ctrl+C) và chạy lại
npm run dev

# 3. Clear cache
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

### Build fails?

```bash
# 1. Clear all caches
Remove-Item -Recurse -Force node_modules, dist, node_modules/.vite

# 2. Reinstall
npm install

# 3. Build lại
npm run build
```

### API không connect được?

1. Kiểm tra `VITE_API_BASE_URL` trong file `.env`
2. Kiểm tra backend có đang chạy không
3. Kiểm tra CORS settings trên backend
4. Xem console logs trong browser DevTools

---

## ✅ Checklist

### Trước khi development:
- [ ] Đã copy `.env.example` thành `.env`
- [ ] Đã cập nhật `VITE_API_BASE_URL` trong `.env`
- [ ] Đã chạy `npm install`
- [ ] Đã test `npm run dev`

### Trước khi deploy:
- [ ] Đã đọc `AZURE_DEPLOYMENT.md`
- [ ] Đã tạo Azure Static Web App
- [ ] Đã setup GitHub Secrets
- [ ] Đã cập nhật API URLs cho staging/production
- [ ] Đã test build local: `npm run build`
- [ ] Đã test preview: `npm run preview:production`

---

## 🎉 Hoàn thành!

Project của bạn đã sẵn sàng để:
- ✅ Phát triển local với environment variables
- ✅ Deploy lên Azure Static Web Apps
- ✅ Quản lý nhiều môi trường (dev, staging, prod)
- ✅ Auto-deployment với GitHub Actions
- ✅ Bảo mật thông tin nhạy cảm

**Next steps**: Đọc `AZURE_DEPLOYMENT.md` để deploy lên Azure!

---

**Questions?** Kiểm tra các file hướng dẫn hoặc xem [Vite Docs](https://vitejs.dev/guide/env-and-mode.html)

