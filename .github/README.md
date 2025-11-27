# 🔧 GitHub Actions & Deployment Configuration

## 📁 Directory Structure

```
.github/
├── workflows/
│   └── azure-static-web-apps.yml    # Blue/Green Deployment workflow
├── SETUP_ENVIRONMENTS.md             # Environment setup guide
└── README.md                         # This file
```

---

## 🔵🟢 Blue/Green Deployment Workflow

### File: `workflows/azure-static-web-apps.yml`

**Purpose:** Implements Blue/Green deployment strategy for Azure Static Web Apps

**Trigger:**
- **Automatic:** Push to `main` branch → Deploy to Staging
- **Manual:** Workflow dispatch → Deploy to Production

**Jobs:**

1. **🟢 deploy_to_staging**
   - Builds with staging configuration
   - Deploys to staging environment
   - No approval required

2. **🔵 deploy_to_production**
   - Builds with production configuration
   - Requires manual trigger
   - Requires reviewer approval
   - Deploys to production environment

---

## 🔐 Required Secrets

Configure these in: `Repository Settings → Secrets and variables → Actions`

### Global Secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING
AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION
VITE_APP_NAME
VITE_APP_VERSION
```

### Environment-Specific Secrets:

**Staging:**
```
STAGING_API_BASE_URL
```

**Production:**
```
PRODUCTION_API_BASE_URL
```

---

## 🌍 Environments Configuration

### Staging Environment

**Name:** `staging`

**Settings:**
- Deployment branches: `main`
- Required reviewers: None
- Wait timer: None
- Purpose: Test new deployments automatically

**URL:** `https://lensart-staging.azurestaticapps.net`

### Production Environment

**Name:** `production`

**Settings:**
- Deployment branches: `main`
- Required reviewers: ✅ YES (1-2 people)
- Wait timer: ✅ Optional (5-10 minutes)
- Purpose: Serve production traffic

**URL:** `https://lensart-production.azurestaticapps.net`

---

## 🚀 How to Use

### Deploy to Staging (Automatic):

```bash
git push origin main
```

→ Workflow automatically triggers
→ Deploys to staging
→ Test at: https://lensart-staging.azurestaticapps.net

### Deploy to Production (Manual):

1. Go to `Actions` tab
2. Select `Blue/Green Deployment - Azure Static Web Apps`
3. Click `Run workflow`
4. Select:
   - Branch: `main`
   - Environment: `production`
5. Click `Run workflow` button
6. Wait for reviewer approval
7. Production deploys after approval

---

## 📋 Workflow Badges

Add these to your main README.md:

```markdown
![Staging Deployment](https://github.com/YOUR_ORG/YOUR_REPO/workflows/Blue%2FGreen%20Deployment%20-%20Azure%20Static%20Web%20Apps/badge.svg?branch=main)
```

---

## 🔄 Deployment Flow

```
Push to main
    ↓
🟢 Auto-deploy to Staging
    ↓
🧪 Test staging
    ↓
🎯 Manual trigger production
    ↓
⏳ Wait for approval
    ↓
🔵 Deploy to Production
    ↓
✅ Done!
```

---

## 🛠️ Maintenance

### Update workflow:

```bash
# Edit workflow file
code .github/workflows/azure-static-web-apps.yml

# Commit changes
git add .github/workflows/azure-static-web-apps.yml
git commit -m "ci: update deployment workflow"
git push origin main
```

### Test workflow:

```bash
# Trigger manually to test
# → Actions tab → Run workflow
```

### Monitor workflow:

```bash
# View in GitHub
# → Actions tab → Select workflow run
# → View logs and status
```

---

## 🆘 Troubleshooting

### Workflow not triggering?

**Check:**
- Branch name is correct (`main`)
- Workflow file in correct location
- YAML syntax is valid
- Repository Actions enabled

### Deployment failing?

**Check:**
- GitHub Secrets configured
- Azure tokens valid
- Build passes locally
- Environment variables correct

### Approval not working?

**Check:**
- Environments configured correctly
- Reviewers have repository access
- Notifications enabled
- Protection rules active

---

## 📚 Documentation

**Main Documentation:**
- `../BLUE_GREEN_DEPLOYMENT.md` - Deployment strategy
- `../DEPLOYMENT_WORKFLOW.md` - Daily workflow guide
- `SETUP_ENVIRONMENTS.md` - Environment setup

**Quick Reference:**
- `../QUICK_REFERENCE.md` - Commands cheat sheet

---

## 🔗 Related Links

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Static Web Apps Deploy Action](https://github.com/Azure/static-web-apps-deploy)

---

## ✅ Best Practices

1. **Test locally before pushing** - `npm run build:staging`
2. **Always test on staging** - Don't skip testing
3. **Use descriptive commit messages** - Easy to track deployments
4. **Monitor after deployment** - Check logs and metrics
5. **Keep secrets updated** - Rotate tokens regularly
6. **Document changes** - Update CHANGELOG
7. **Tag production releases** - `git tag v1.0.0`

---

**GitHub Actions Configuration v1.0** | Automated Blue/Green Deployments

