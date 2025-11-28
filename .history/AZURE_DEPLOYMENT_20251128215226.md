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

**Quan trọng**: Có 3 cách để lấy deployment token:

#### Cách 1: Sử dụng GitHub Integration (Khuyến nghị - Tự động) ⭐

Nếu bạn đã kết nối GitHub khi tạo Static Web App:
- Azure **tự động tạo** deployment token
- Token **tự động được thêm** vào GitHub repository secrets
- Tên secret: `AZURE_STATIC_WEB_APPS_API_TOKEN_<RANDOM_STRING>`
- **Bạn KHÔNG cần copy thủ công!** ✅

**Kiểm tra**: Vào GitHub Repository → Settings → Secrets and variables → Actions
- Nếu thấy secret có tên `AZURE_STATIC_WEB_APPS_API_TOKEN_...` → Đã xong!

#### Cách 2: Qua Azure Portal (Thủ công)

1. Sau khi tạo xong, vào Static Web App resource
2. Vào **Overview** (thanh menu bên trái)
3. Tìm nút **"Manage deployment token"** ở thanh menu trên
4. Click và chọn **"Copy token"**

**Hoặc:**

1. Vào **Settings** > **Properties** (không phải Configuration!)
2. Scroll xuống tìm **"Deployment token"**
3. Click icon copy bên cạnh

#### Cách 3: Sử dụng Azure CLI

```bash
# Đăng nhập Azure
az login

# Lấy deployment token
az staticwebapp secrets list \
  --name <tên-static-web-app> \
  --resource-group <tên-resource-group>
```

---

## Cấu hình GitHub Secrets

### Bước 1: Kiểm tra Secrets hiện có

1. Vào repository trên GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Kiểm tra xem đã có secret nào chưa

**Nếu thấy secret** có tên dạng `AZURE_STATIC_WEB_APPS_API_TOKEN_<RANDOM_STRING>`:
- ✅ Deployment token đã được Azure tự động thêm
- ✅ Bạn **KHÔNG cần thêm lại**
- ⏭️ Chuyển sang Bước 2 để thêm Environment Variables

**Nếu KHÔNG thấy**: 
- ➕ Click "New repository secret"
- Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Value: Paste deployment token từ Azure (xem phần trước)
- Click "Add secret"

### Bước 2: Thêm Environment Variables Secrets

Click **"New repository secret"** và thêm từng secret sau:

#### 🔹 Secrets cho Production (main branch):

| Secret Name | Secret Value | Mô tả |
|-------------|--------------|-------|
| `VITE_API_BASE_URL` | `https://your-production-api.azurewebsites.net/api` | URL API production |
| `VITE_APP_ENV` | `production` | Environment name |
| `VITE_APP_NAME` | `LensArt` | Tên app |
| `VITE_APP_VERSION` | `1.0.0` | Version hiện tại |

**Cách thêm**:
```
1. Click "New repository secret"
2. Name: VITE_API_BASE_URL
3. Secret: https://your-production-api.azurewebsites.net/api
4. Click "Add secret"
5. Lặp lại cho các secrets còn lại
```

#### 🔹 Secrets cho Staging (staging branch) - Optional:

Nếu bạn có staging environment:

| Secret Name | Secret Value | Mô tả |
|-------------|--------------|-------|
| `VITE_API_BASE_URL_STAGING` | `https://your-staging-api.azurewebsites.net/api` | URL API staging |
| `VITE_APP_ENV_STAGING` | `staging` | Environment name |
| `VITE_APP_NAME_STAGING` | `LensArt (Staging)` | Tên app staging |

### Bước 3: Xác nhận Secrets đã được thêm

Sau khi thêm xong, bạn sẽ thấy danh sách secrets:

```
✅ AZURE_STATIC_WEB_APPS_API_TOKEN_XXXXXXXXX
✅ VITE_API_BASE_URL
✅ VITE_APP_ENV
✅ VITE_APP_NAME
✅ VITE_APP_VERSION
✅ VITE_API_BASE_URL_STAGING (nếu có)
✅ VITE_APP_ENV_STAGING (nếu có)
✅ VITE_APP_NAME_STAGING (nếu có)
```

> **💡 Lưu ý**: 
> - Secrets này sẽ được GitHub Actions sử dụng khi build và deploy
> - Bạn **KHÔNG thể xem lại** giá trị của secrets sau khi thêm (chỉ có thể update)
> - Thay `your-production-api.azurewebsites.net` bằng URL API thực của bạn

---

## Cấu hình Environment Variables

### 🎯 Chọn nơi lưu Environment Variables

Bạn có **2 lựa chọn** để cấu hình environment variables:

#### ✅ Option 1: GitHub Secrets (Khuyến nghị) ⭐

**Ưu điểm:**
- ✅ Dễ quản lý và version control
- ✅ Tự động inject vào build process
- ✅ Bảo mật cao
- ✅ Có thể khác nhau cho từng branch

**Cách dùng:** 
- Đã cấu hình ở phần trước (Cấu hình GitHub Secrets)
- GitHub Actions workflow sẽ tự động sử dụng

#### Option 2: Azure Portal Configuration

**Ưu điểm:**
- ✅ Thay đổi không cần redeploy
- ✅ Quản lý tập trung trong Azure

**Nhược điểm:**
- ❌ Khó track changes
- ❌ Phải cấu hình thủ công cho mỗi environment

**Cách dùng:**

1. Vào Azure Static Web App resource
2. **Settings** > **Configuration**
3. **Environment** tab (chọn Production hoặc Staging)
4. Click **"+ Add"** để thêm từng variable:

**Cho Production:**

| Application settings name | Value |
|---------------------------|-------|
| `VITE_API_BASE_URL` | `https://your-production-api.azurewebsites.net/api` |
| `VITE_APP_ENV` | `production` |
| `VITE_APP_NAME` | `LensArt` |
| `VITE_APP_VERSION` | `1.0.0` |

5. Click **"Save"** (ở trên cùng)
6. Click **"Continue"** để xác nhận restart

**Cho Staging:**

| Application settings name | Value |
|---------------------------|-------|
| `VITE_API_BASE_URL` | `https://your-staging-api.azurewebsites.net/api` |
| `VITE_APP_ENV` | `staging` |
| `VITE_APP_NAME` | `LensArt (Staging)` |
| `VITE_APP_VERSION` | `1.0.0` |

### 🤔 Nên chọn option nào?

| Tiêu chí | GitHub Secrets | Azure Configuration |
|----------|---------------|---------------------|
| **Dễ setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Bảo mật** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Version control** | ✅ Có | ❌ Không |
| **Thay đổi nhanh** | ❌ Cần redeploy | ✅ Không cần |
| **Multi-environment** | ✅ Dễ | ⚠️ Khó hơn |

> **💡 Khuyến nghị**: 
> - Dùng **GitHub Secrets** cho hầu hết các trường hợp
> - Chỉ dùng **Azure Configuration** khi cần thay đổi variables mà không muốn redeploy

---

## 🔍 Xác nhận Setup đã đúng

Trước khi deploy, hãy kiểm tra lại:

### ✅ Checklist Azure Portal

1. **Overview**:
   - [ ] Status: Running (màu xanh)
   - [ ] URL: `https://<your-app>.azurestaticapps.net` (có thể click để mở)
   - [ ] GitHub repository đã được kết nối

2. **Configuration** (nếu dùng Azure Configuration):
   - [ ] Environment variables đã được thêm
   - [ ] Application settings đúng với environment

### ✅ Checklist GitHub

1. **Secrets and variables > Actions**:
   - [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN_*` tồn tại
   - [ ] `VITE_API_BASE_URL` đã được thêm
   - [ ] `VITE_APP_ENV` đã được thêm
   - [ ] Các secrets khác đã được thêm

2. **Workflows**:
   - [ ] File `.github/workflows/azure-static-web-apps.yml` tồn tại
   - [ ] Workflow sử dụng đúng secrets

### 🔎 Kiểm tra Workflow File

Mở file `.github/workflows/azure-static-web-apps.yml` và xác nhận:

```yaml
env:
  VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
  VITE_APP_ENV: ${{ secrets.VITE_APP_ENV }}
  VITE_APP_NAME: ${{ secrets.VITE_APP_NAME }}
  VITE_APP_VERSION: ${{ secrets.VITE_APP_VERSION }}
```

Và:

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_XXXXX }}
```

> **⚠️ Chú ý**: Tên secret `AZURE_STATIC_WEB_APPS_API_TOKEN_XXXXX` phải khớp với tên trong GitHub Secrets!

### 🧪 Test Local trước khi Deploy

```bash
# 1. Install dependencies
npm install

# 2. Build project
npm run build

# 3. Preview build locally
npm run preview
```

Nếu build thành công và preview chạy được → Sẵn sàng deploy!

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

