# 🔧 Setup GitHub Environments for Blue/Green Deployment

## 📋 Overview

Để sử dụng Blue/Green deployment với manual approval, bạn cần setup GitHub Environments.

---

## 🚀 Step-by-Step Setup

### Step 1: Truy cập Repository Settings

1. Vào GitHub repository của bạn
2. Click vào tab **Settings**
3. Sidebar bên trái → **Environments**

---

### Step 2: Tạo Staging Environment (Green)

1. Click **New environment**
2. Name: `staging`
3. Click **Configure environment**

#### Staging Configuration:

**Deployment branches:**
- ✅ Selected branches
- Add rule: `main`

**Environment secrets** (nếu cần override):
```
STAGING_API_BASE_URL=https://your-staging-api.azurewebsites.net/api
```

**Protection rules:**
- ❌ KHÔNG cần required reviewers (staging auto-deploy)
- ❌ KHÔNG cần wait timer

4. Click **Save protection rules**

---

### Step 3: Tạo Production Environment (Blue)

1. Click **New environment**
2. Name: `production`
3. Click **Configure environment**

#### Production Configuration:

**Environment protection rules:**

✅ **Required reviewers**
- Click **Add reviewers**
- Chọn team members có quyền approve production deployments
- Recommend: ít nhất 1-2 người

✅ **Wait timer** (optional)
- Thời gian chờ trước khi deploy
- Recommend: 5-10 minutes
- Cho phép double-check trước khi deploy

✅ **Deployment branches**
- Selected branches
- Add rule: `main`

**Environment secrets:**
```
PRODUCTION_API_BASE_URL=https://your-production-api.azurewebsites.net/api
```

4. Click **Save protection rules**

---

## 🔐 Required GitHub Secrets

Vào: **Settings** → **Secrets and variables** → **Actions**

### Repository Secrets (Global):

| Secret Name | Value | Description |
|------------|-------|-------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING` | `***` | Token từ Azure Staging resource |
| `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION` | `***` | Token từ Azure Production resource |
| `VITE_APP_NAME` | `LensArt` | App name |
| `VITE_APP_VERSION` | `1.0.0` | Current version |

### Environment-Specific Secrets:

**Staging Environment:**
```
STAGING_API_BASE_URL=https://lensart-staging-api.azurewebsites.net/api
```

**Production Environment:**
```
PRODUCTION_API_BASE_URL=https://lensart-production-api.azurewebsites.net/api
```

---

## 📝 How to Get Azure Deployment Tokens

### For Staging:

1. Vào [Azure Portal](https://portal.azure.com)
2. Tìm và mở **Static Web App** cho staging (e.g., `lensart-staging`)
3. Sidebar → **Settings** → **Configuration**
4. Copy **Deployment token**
5. Add vào GitHub Secrets với tên `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING`

### For Production:

1. Vào [Azure Portal](https://portal.azure.com)
2. Tìm và mở **Static Web App** cho production (e.g., `lensart-production`)
3. Sidebar → **Settings** → **Configuration**
4. Copy **Deployment token**
5. Add vào GitHub Secrets với tên `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION`

---

## ✅ Verification

### Test Staging Deployment:

```bash
# Push to main branch
git add .
git commit -m "test: staging deployment"
git push origin main

# Check GitHub Actions
# → Actions tab → Workflow should run automatically
# → Deploy to Staging job should succeed
```

### Test Production Deployment:

1. **Trigger workflow manually:**
   - Actions tab → **Blue/Green Deployment**
   - **Run workflow**
   - Branch: `main`
   - Environment: `production`

2. **Approval required:**
   - Reviewer sẽ nhận notification
   - Review và approve deployment
   - Workflow tiếp tục deploy to production

---

## 🎯 Best Practices

### Reviewers Selection:

✅ **DO:**
- Chọn Tech Leads, Senior Developers
- Ít nhất 2 reviewers cho production
- People hiểu về business impact

❌ **DON'T:**
- Chỉ 1 reviewer duy nhất (single point of failure)
- Junior developers cho production approvals
- Người không available thường xuyên

### Protection Rules:

✅ **DO:**
- Staging: No protection (fast iteration)
- Production: Required reviewers + wait timer
- Test deployment flow thường xuyên

❌ **DON'T:**
- Over-protect staging (làm chậm development)
- Under-protect production (risk)
- Skip testing on staging

---

## 🔄 Deployment Flow Visualization

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Developer                                               │
│     ↓                                                    │
│  git push origin main                                    │
│     ↓                                                    │
│  🟢 Auto Deploy to STAGING                              │
│     ↓                                                    │
│  🧪 Test on Staging                                     │
│     ↓                                                    │
│  ✅ Looks Good!                                         │
│     ↓                                                    │
│  🎯 Manually trigger Production deployment              │
│     ↓                                                    │
│  ⏳ Wait for Approval (GitHub Environment Protection)   │
│     ↓                                                    │
│  👥 Reviewer approves                                   │
│     ↓                                                    │
│  🔵 Deploy to PRODUCTION                                │
│     ↓                                                    │
│  ✅ Production Live!                                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Environment URLs

Sau khi setup:

```
🟢 Staging:    https://lensart-staging.azurestaticapps.net
🔵 Production: https://lensart-production.azurestaticapps.net
```

**Note**: URLs sẽ khác tùy theo Static Web App names bạn tạo.

---

## 🆘 Troubleshooting

### Issue: "Environment protection rules" không xuất hiện

**Solution:**
- Đảm bảo repository không phải là private với free plan
- Upgrade to GitHub Pro/Team/Enterprise
- Hoặc dùng manual approval qua Pull Requests

### Issue: Reviewer không nhận notification

**Solution:**
1. Check email settings: Settings → Notifications
2. Enable "Actions" notifications
3. Check spam folder
4. Verify reviewer có quyền truy cập repository

### Issue: Deployment token không hoạt động

**Solution:**
1. Regenerate token trên Azure Portal
2. Update secret trên GitHub
3. Verify token name chính xác trong workflow
4. Check Azure Static Web App còn active

---

## 📚 References

- [GitHub Environments Docs](https://docs.github.com/en/actions/deployment/targeting-different-environments)
- [Environment Protection Rules](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#environment-protection-rules)
- [Azure Static Web Apps Deployment](https://docs.microsoft.com/azure/static-web-apps/)

---

## ✅ Checklist

### Setup Complete When:

- [ ] Staging environment created
- [ ] Production environment created
- [ ] Reviewers added to production
- [ ] All secrets configured
- [ ] Azure deployment tokens added
- [ ] API URLs configured for both environments
- [ ] Test staging deployment successful
- [ ] Test production approval flow
- [ ] Team members notified about approval process

---

**Environment Setup v1.0** | Secure Deployment Pipeline

