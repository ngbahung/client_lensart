# 🔵🟢 Blue/Green Deployment Strategy

## 📋 Tổng quan

Blue/Green Deployment là một chiến lược deployment giúp giảm thiểu downtime và rủi ro bằng cách duy trì hai môi trường production giống hệt nhau.

### Khái niệm:
- **🟢 Green (Staging)**: Môi trường mới với code vừa deploy
- **🔵 Blue (Production)**: Môi trường hiện tại đang serve traffic
- **🔄 Swap**: Chuyển đổi traffic từ Blue sang Green khi ready

---

## 🎯 Workflow Process

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. Code Push to main branch                           │
│     ↓                                                   │
│  2. 🟢 Auto Deploy to STAGING (Green Environment)      │
│     ↓                                                   │
│  3. 🧪 Test & Verify on Staging                        │
│     ↓                                                   │
│  4. ✅ Manual Approval (GitHub Actions)                │
│     ↓                                                   │
│  5. 🔵 Deploy to PRODUCTION (Blue Environment)         │
│     ↓                                                   │
│  6. ✅ Production Live!                                │
│     ↓                                                   │
│  7. 🔄 Previous version available for quick rollback   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Setup Instructions

### Step 1: Tạo hai Azure Static Web Apps

#### Staging Environment (Green)
```
Name: lensart-staging
URL: https://lensart-staging.azurestaticapps.net
Purpose: Test new deployments before production
```

#### Production Environment (Blue)
```
Name: lensart-production
URL: https://lensart-production.azurestaticapps.net
Purpose: Serve production traffic
```

### Step 2: Cấu hình GitHub Secrets

Vào: `Repository Settings` → `Secrets and variables` → `Actions`

#### Required Secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING
→ Deployment token từ Staging Static Web App

AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION
→ Deployment token từ Production Static Web App

STAGING_API_BASE_URL
→ https://your-staging-api.azurewebsites.net/api

PRODUCTION_API_BASE_URL
→ https://your-production-api.azurewebsites.net/api

VITE_APP_NAME
→ LensArt

VITE_APP_VERSION
→ 1.0.0
```

### Step 3: Setup GitHub Environments

Vào: `Repository Settings` → `Environments`

#### Create "staging" environment:
- ✅ No protection rules needed (auto-deploy)
- URL pattern: `https://lensart-staging.azurestaticapps.net`

#### Create "production" environment:
- ✅ **Required reviewers**: Add team members who can approve
- ✅ **Wait timer**: Optional (e.g., 5 minutes)
- URL pattern: `https://lensart-production.azurestaticapps.net`

---

## 📝 How to Deploy

### Automatic Deployment to Staging (Green)

Mỗi khi push code lên `main` branch:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
```

**Kết quả:**
- ✅ Code tự động deploy lên **Staging (Green)**
- ✅ URL: `https://lensart-staging.azurestaticapps.net`
- ✅ Có thể test ngay

### Manual Deployment to Production (Blue)

Sau khi test Staging OK:

1. **Vào GitHub Repository**
2. **Actions tab** → **Blue/Green Deployment - Azure Static Web Apps**
3. **Run workflow** button
4. Chọn:
   - Branch: `main`
   - Environment: **production**
5. **Run workflow**

**Kết quả:**
- ⏳ GitHub sẽ yêu cầu approval (nếu đã setup)
- 👥 Reviewer approve deployment
- ✅ Code deploy lên **Production (Blue)**
- ✅ URL: `https://lensart-production.azurestaticapps.net`

---

## 🔄 Rollback Strategy

### Quick Rollback Options

#### Option 1: Redeploy Previous Version
```bash
# Checkout previous commit
git checkout <previous-commit-hash>

# Trigger deployment
git push origin main

# After staging verification, deploy to production manually
```

#### Option 2: GitHub Releases
```bash
# Create releases for each production deployment
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0

# To rollback, checkout tag and redeploy
git checkout v1.0.0
git push origin main
```

#### Option 3: Azure Portal
1. Vào Azure Static Web App (Production)
2. **Deployments** tab
3. Chọn previous deployment
4. Click **Promote to production**

---

## 🧪 Testing Checklist

### Before Promoting to Production:

#### Staging Environment Tests:
- [ ] ✅ Application loads successfully
- [ ] ✅ All pages are accessible
- [ ] ✅ API connections working
- [ ] ✅ Authentication/Login working
- [ ] ✅ Critical user flows tested
- [ ] ✅ No console errors
- [ ] ✅ Performance is acceptable
- [ ] ✅ Mobile responsive working
- [ ] ✅ Cross-browser testing done
- [ ] ✅ Third-party integrations working

#### Production Readiness:
- [ ] ✅ Environment variables correct
- [ ] ✅ API endpoints point to production
- [ ] ✅ Database migrations completed (if any)
- [ ] ✅ Monitoring/logging configured
- [ ] ✅ Team notified about deployment
- [ ] ✅ Rollback plan ready

---

## 🎛️ Workflow Controls

### Manual Workflow Triggers

#### Deploy to Staging:
```bash
# Via GitHub Actions UI:
# 1. Actions tab → Select workflow
# 2. Run workflow → Select 'staging'
```

#### Deploy to Production:
```bash
# Via GitHub Actions UI:
# 1. Actions tab → Select workflow
# 2. Run workflow → Select 'production'
# 3. Wait for approval (if configured)
# 4. Approve and deploy
```

---

## 🔐 Security & Best Practices

### ✅ Implemented:

1. **Separate Environments**: Staging và Production hoàn toàn tách biệt
2. **Manual Approval**: Production requires approval trước khi deploy
3. **Environment Secrets**: Mỗi environment có secrets riêng
4. **Deployment Logs**: Full audit trail trong GitHub Actions
5. **Rollback Ready**: Previous version luôn available

### ⚠️ Important Notes:

1. **NEVER skip staging**: Luôn test trên staging trước
2. **Test thoroughly**: Staging = Pre-production testing
3. **Monitor after deployment**: Watch logs và metrics
4. **Keep versions tagged**: Để dễ rollback
5. **Document changes**: Trong commit messages và release notes

---

## 📊 Monitoring

### Staging Environment

```javascript
// Add to your app for staging monitoring
if (import.meta.env.VITE_APP_ENV === 'staging') {
  console.log('🟢 Running in STAGING environment');
  console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
  
  // More verbose logging in staging
  window.addEventListener('error', (e) => {
    console.error('Staging Error:', e);
  });
}
```

### Production Environment

```javascript
// Production monitoring (minimal console logs)
if (import.meta.env.VITE_APP_ENV === 'production') {
  console.log('🔵 Running in PRODUCTION environment');
  
  // Send errors to monitoring service
  window.addEventListener('error', (e) => {
    // Send to Application Insights, Sentry, etc.
  });
}
```

---

## 📈 Deployment Metrics

### Track these metrics:

| Metric | Description | Target |
|--------|-------------|--------|
| **Deployment Frequency** | Số lần deploy/tuần | 2-5 times/week |
| **Lead Time** | Time từ commit đến production | < 1 hour |
| **Staging Test Time** | Time test trên staging | 15-30 minutes |
| **Rollback Time** | Time để rollback nếu có issue | < 5 minutes |
| **Success Rate** | % deployments thành công | > 98% |
| **Downtime** | Downtime trong deployment | 0 seconds |

---

## 🆘 Troubleshooting

### Issue: Staging deployment fails

**Solutions:**
```bash
# 1. Check build locally
npm run build:staging

# 2. Check GitHub Actions logs
# → Actions tab → Failed workflow → View logs

# 3. Verify secrets
# → Settings → Secrets → Check all STAGING_* secrets

# 4. Check Azure Static Web App status
# → Azure Portal → Staging resource → Check health
```

### Issue: Production deployment not triggering

**Solutions:**
1. Check GitHub Environment protection rules
2. Verify `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION` exists
3. Ensure you have permissions to deploy to production
4. Check workflow dispatch inputs are correct

### Issue: Need to rollback immediately

**Quick Rollback:**
```bash
# 1. Via Azure Portal (fastest)
# → Static Web App → Deployments → Previous version → Promote

# 2. Via Git (for code rollback)
git revert HEAD
git push origin main
# Then manually deploy to production
```

---

## 📚 Deployment History

### Best Practices for Tracking:

```bash
# Tag each production deployment
git tag -a v1.0.0 -m "Production release v1.0.0 - Feature XYZ"
git push origin v1.0.0

# View deployment history
git tag -l
git log --oneline --decorate

# Create release notes
# → GitHub Releases → New release → Document changes
```

---

## 🎯 Advantages of Blue/Green Deployment

### ✅ Benefits:

1. **Zero Downtime**: Instant switchover
2. **Easy Rollback**: Just switch back to previous version
3. **Safe Testing**: Test in production-like environment
4. **Risk Reduction**: Catch issues before production
5. **Confidence**: Manual approval gate
6. **Audit Trail**: Full deployment history

### ⚠️ Considerations:

1. **Cost**: Requires two environments
2. **Database Sync**: Need to handle DB migrations carefully
3. **Manual Step**: Requires manual promotion to production
4. **Testing Time**: Need time to test staging thoroughly

---

## 📖 Additional Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments)
- [Blue/Green Deployment Pattern](https://martinfowler.com/bliki/BlueGreenDeployment.html)

---

## ✅ Quick Reference

### Deployment Commands:

```bash
# 1. Push to main → Auto deploy to staging
git push origin main

# 2. Test staging
# → Visit https://lensart-staging.azurestaticapps.net

# 3. Promote to production
# → GitHub Actions UI → Run workflow → Select 'production'

# 4. Monitor production
# → Visit https://lensart-production.azurestaticapps.net
```

### URLs:

```
🟢 Staging:    https://lensart-staging.azurestaticapps.net
🔵 Production: https://lensart-production.azurestaticapps.net
📊 GitHub:     https://github.com/YOUR_ORG/YOUR_REPO/actions
```

---

**Blue/Green Deployment v1.0** | Safe, Reliable, Zero-Downtime Deployments

