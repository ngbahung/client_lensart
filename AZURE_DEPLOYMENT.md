# 🚀 Hướng dẫn Deploy lên Azure Static Web Apps

## 📋 Mục lục
1. [Yêu cầu](#yêu-cầu)
2. [Cấu hình Azure](#cấu-hình-azure)
3. [Cấu hình GitHub Secrets](#cấu-hình-github-secrets)
4. [Cấu hình Environment Variables](#cấu-hình-environment-variables)
5. [Deploy](#deploy)
6. [Quản lý nhiều môi trường](#quản-lý-nhiều-môi-trường)

---

## Yêu cầu

- ✅ Tài khoản Azure (có thể dùng free tier)
- ✅ Repository GitHub
- ✅ Node.js 18 trở lên
- ✅ Azure CLI (optional, để test local)

---

## Cấu hình Azure

### Bước 1: Tạo Azure Static Web App

1. Đăng nhập vào [Azure Portal](https://portal.azure.com)
2. Tìm kiếm "Static Web Apps" và chọn "Create"
3. Điền thông tin:
   - **Subscription**: Chọn subscription của bạn
   - **Resource Group**: Tạo mới hoặc chọn existing
   - **Name**: `lensart-client` (hoặc tên bạn muốn)
   - **Plan type**: Free (cho development) hoặc Standard (cho production)
   - **Region**: Chọn region gần nhất
   - **Deployment details**:
     - Source: GitHub
     - Organization: Chọn GitHub organization của bạn
     - Repository: Chọn repository này
     - Branch: `main`
   - **Build Details**:
     - Build Presets: `React`
     - App location: `/`
     - API location: (để trống)
     - Output location: `dist`

4. Click "Review + create" và sau đó "Create"

### Bước 2: Lấy Deployment Token

1. Sau khi tạo xong, vào resource vừa tạo
2. Vào **Settings** > **Configuration**
3. Copy **Deployment token** (sẽ dùng trong GitHub Secrets)

---

## Cấu hình GitHub Secrets

### Thêm Secrets vào GitHub Repository

1. Vào repository trên GitHub
2. Settings > Secrets and variables > Actions
3. Click "New repository secret" và thêm các secrets sau:

#### Required Secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN
→ Paste deployment token từ Azure
```

#### Environment Variables Secrets:

**Cho Production (main branch):**
```
VITE_API_BASE_URL=https://your-production-api.azurewebsites.net/api
VITE_APP_ENV=production
VITE_APP_NAME=LensArt
VITE_APP_VERSION=1.0.0
```

**Cho Staging (staging branch):**
```
VITE_API_BASE_URL=https://your-staging-api.azurewebsites.net/api
VITE_APP_ENV=staging
VITE_APP_NAME=LensArt (Staging)
VITE_APP_VERSION=1.0.0
```

---

## Cấu hình Environment Variables

### Trong Azure Portal

1. Vào Azure Static Web App resource
2. **Settings** > **Configuration**
3. Click "Add" để thêm environment variables:

| Name | Value (Production) | Value (Staging) |
|------|-------------------|-----------------|
| `VITE_API_BASE_URL` | `https://your-production-api.azurewebsites.net/api` | `https://your-staging-api.azurewebsites.net/api` |
| `VITE_APP_ENV` | `production` | `staging` |
| `VITE_APP_NAME` | `LensArt` | `LensArt (Staging)` |
| `VITE_APP_VERSION` | `1.0.0` | `1.0.0` |

4. Click "Save"

> **Lưu ý**: Bạn có thể cấu hình variables trong GitHub Secrets HOẶC Azure Portal. 
> Recommend: Dùng GitHub Secrets để dễ quản lý và maintain.

---

## Deploy

### Automatic Deployment (Recommended)

GitHub Actions sẽ tự động deploy khi:
- Push code lên `main` branch → Deploy Production
- Push code lên `staging` branch → Deploy Staging
- Tạo Pull Request → Deploy Preview Environment

### Manual Deployment

#### Sử dụng Azure CLI:

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Build project
npm run build

# Deploy to Azure
swa deploy --deployment-token <YOUR_DEPLOYMENT_TOKEN>
```

#### Sử dụng npm scripts:

```bash
# Build cho production
npm run build

# Build cho staging
npm run build:staging

# Build cho development
npm run build:dev

# Preview build locally
npm run preview
```

---

## Quản lý nhiều môi trường

### 1. Cấu trúc Environment Files

```
.env                    # Local development (gitignored)
.env.development        # Development config (gitignored)
.env.staging           # Staging config (gitignored)
.env.production        # Production config (gitignored)
.env.example           # Template (committed to git)
```

### 2. Tạo nhiều Static Web Apps

Để tách biệt hoàn toàn các môi trường:

#### Production:
- Name: `lensart-client-prod`
- Branch: `main`
- URL: `https://lensart-client-prod.azurestaticapps.net`

#### Staging:
- Name: `lensart-client-staging`
- Branch: `staging`
- URL: `https://lensart-client-staging.azurestaticapps.net`

### 3. Cấu hình Custom Domain

1. Vào Azure Static Web App
2. **Settings** > **Custom domains**
3. Click "Add" và follow instructions
4. Ví dụ:
   - Production: `www.lensart.com`
   - Staging: `staging.lensart.com`

---

## 🔧 Troubleshooting

### Build fails trên Azure

**Vấn đề**: Build script không tìm thấy dependencies

**Giải pháp**:
```bash
# Đảm bảo package-lock.json được commit
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Environment Variables không hoạt động

**Vấn đề**: Variables không được inject vào build

**Giải pháp**:
1. Kiểm tra tên variables phải bắt đầu với `VITE_`
2. Restart dev server sau khi thay đổi .env
3. Clear cache và rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Routing không hoạt động (404 errors)

**Vấn đề**: React Router trả về 404 khi refresh page

**Giải pháp**: Đã được cấu hình trong `staticwebapp.config.json`:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

### CORS errors với API

**Vấn đề**: Không thể gọi API từ frontend

**Giải pháp**: Cấu hình CORS trên backend API:
```javascript
// Backend (Laravel/Node.js)
// Allow origin từ Azure Static Web App URL
Access-Control-Allow-Origin: https://your-app.azurestaticapps.net
```

---

## 📊 Monitoring và Logging

### Application Insights (Optional)

1. Tạo Application Insights resource trong Azure
2. Lấy Instrumentation Key
3. Thêm vào environment variables:
```
VITE_APPINSIGHTS_INSTRUMENTATIONKEY=your-key
```

4. Cài đặt package:
```bash
npm install @microsoft/applicationinsights-web
```

5. Implement trong code:
```javascript
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: import.meta.env.VITE_APPINSIGHTS_INSTRUMENTATIONKEY
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView();
```

### View Logs

1. Vào Azure Static Web App
2. **Monitoring** > **Logs**
3. Hoặc xem GitHub Actions logs

---

## 🔐 Security Best Practices

1. ✅ **Không commit .env files** (đã add vào .gitignore)
2. ✅ **Sử dụng GitHub Secrets** cho sensitive data
3. ✅ **Rotate deployment tokens** định kỳ
4. ✅ **Enable HTTPS** (tự động bởi Azure)
5. ✅ **Cấu hình CSP headers** (đã có trong staticwebapp.config.json)
6. ✅ **Review dependencies** thường xuyên:
```bash
npm audit
npm audit fix
```

---

## 🚀 Performance Optimization

### 1. Code Splitting đã được cấu hình

```javascript
// vite.config.js
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'ui-vendor': ['react-icons', 'react-toastify', 'sweetalert2'],
}
```

### 2. Enable compression trong Azure

Trong `staticwebapp.config.json`:
```json
{
  "globalHeaders": {
    "content-encoding": "gzip"
  }
}
```

### 3. Optimize images

- Sử dụng WebP format
- Lazy loading images
- CDN cho static assets

---

## 📞 Support

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ✅ Checklist trước khi Deploy

- [ ] Environment variables đã được cấu hình
- [ ] GitHub Secrets đã được thêm
- [ ] API URLs đã được cập nhật
- [ ] Build local thành công (`npm run build`)
- [ ] Test preview local (`npm run preview`)
- [ ] .env files đã được gitignore
- [ ] staticwebapp.config.json đã được review
- [ ] CORS đã được cấu hình trên backend
- [ ] Custom domain đã được setup (nếu cần)
- [ ] SSL certificate đã active

---

**Good luck with your deployment! 🎉**

