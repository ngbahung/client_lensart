# 📝 Quick Reference - Tham khảo nhanh

## 🎯 Commands thông dụng

### Development
```bash
# Setup lần đầu
cp .env.example .env          # Tạo file config local
npm install                   # Cài đặt dependencies
npm run dev                   # Chạy dev server (localhost:3000)
```

### Build & Preview
```bash
npm run build                 # Build production
npm run build:staging         # Build staging
npm run preview               # Preview build
npm run preview:production    # Build + preview production
npm run preview:staging       # Build + preview staging
```

### Lint
```bash
npm run lint                  # Chạy ESLint
```

---

## 📁 Environment Files

| File | Purpose | Gitignored |
|------|---------|------------|
| `.env` | Local config của bạn | ✅ Yes |
| `.env.development` | Development defaults | ✅ Yes |
| `.env.staging` | Staging config | ✅ Yes |
| `.env.production` | Production config | ✅ Yes |
| `.env.example` | Template to share | ❌ No (committed) |

---

## 🌍 Environment Variables

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_ENV=development
VITE_APP_NAME=LensArt
VITE_APP_VERSION=1.0.0
```

### Sử dụng trong code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const env = import.meta.env.VITE_APP_ENV;
```

---

## 🚀 Deploy to Azure (Blue/Green Strategy)

### Deployment Flow:
```bash
# 1. Push to main → Auto deploy to STAGING (Green)
git add .
git commit -m "feat: new feature"
git push origin main

# 2. Test staging environment
# Visit: https://lensart-staging.azurestaticapps.net

# 3. When ready, promote to PRODUCTION (Blue)
# → GitHub Actions UI → Run workflow → Select 'production'
```

### Environments:
- 🟢 **Staging (Green)**: Auto-deploy from main branch
- 🔵 **Production (Blue)**: Manual deploy with approval

📖 **Full Guide:** [BLUE_GREEN_DEPLOYMENT.md](./BLUE_GREEN_DEPLOYMENT.md)

---

## 🔧 Troubleshooting

### Env variables không hoạt động?
```bash
# Restart dev server (Ctrl+C rồi chạy lại)
npm run dev

# Hoặc clear cache
rm -rf node_modules/.vite
npm run dev
```

### Build fails?
```bash
# Clear và reinstall
rm -rf node_modules dist
npm install
npm run build
```

### API không connect?
1. Check `.env` file có đúng API URL không
2. Backend có đang chạy không?
3. Check CORS settings trên backend
4. Xem browser console để debug

---

## 📚 Documentation

- **ENV_SETUP.md** - Chi tiết về environment variables
- **AZURE_DEPLOYMENT.md** - Hướng dẫn deploy Azure
- **ENVIRONMENT_SETUP_SUMMARY.md** - Tóm tắt cấu hình
- **README.md** - Hướng dẫn chung

---

## 🔐 Security Checklist

- [x] .env files trong .gitignore
- [x] Không commit sensitive data
- [x] Sử dụng GitHub Secrets cho CI/CD
- [x] HTTPS enabled (Azure tự động)
- [x] Security headers configured

---

## ✅ Pre-deployment Checklist

### Local:
- [ ] `.env` configured
- [ ] `npm install` done
- [ ] `npm run dev` works
- [ ] Backend API accessible

### Azure:
- [ ] Azure Static Web App created
- [ ] GitHub Secrets configured
- [ ] `.env.production` URLs updated
- [ ] `npm run build` successful locally
- [ ] Pushed to `main` branch

---

## 🆘 Need Help?

1. **Environment Setup** → Read `ENV_SETUP.md`
2. **Azure Deployment** → Read `AZURE_DEPLOYMENT.md`
3. **Full Summary** → Read `ENVIRONMENT_SETUP_SUMMARY.md`
4. **Vite Docs** → https://vitejs.dev/guide/env-and-mode.html
5. **Azure Docs** → https://docs.microsoft.com/azure/static-web-apps/

---

## 💡 Pro Tips

### Tip 1: Local API override
```bash
# Create .env.local (higher priority than .env)
echo "VITE_API_BASE_URL=http://192.168.1.100:8000/api" > .env.local
```

### Tip 2: Debug environment
```javascript
// Add to your component
console.table({
  'API URL': import.meta.env.VITE_API_BASE_URL,
  'Environment': import.meta.env.VITE_APP_ENV,
  'Mode': import.meta.env.MODE,
  'Dev': import.meta.env.DEV,
  'Prod': import.meta.env.PROD,
});
```

### Tip 3: Quick test build
```bash
# Build và test trong 1 command
npm run preview:production
```

---

**Quick Reference Card v1.0** | Last updated: Nov 27, 2025

