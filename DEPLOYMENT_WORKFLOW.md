# 🔄 Deployment Workflow - Quick Guide

## 🎯 Blue/Green Deployment Strategy

### Concept:
- 🟢 **GREEN (Staging)**: New code, safe testing environment
- 🔵 **BLUE (Production)**: Live environment serving users
- 🔄 **Swap**: Promote Green to Blue when ready

---

## 📋 Daily Workflow

### 1️⃣ Development & Push

```bash
# Work on your feature
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat: new awesome feature"

# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

**Result:** ✅ Auto-deploy to 🟢 **Staging**

---

### 2️⃣ Test on Staging (Green Environment)

```
🟢 Staging URL: https://lensart-staging.azurestaticapps.net
```

**Testing Checklist:**
- [ ] Application loads
- [ ] No console errors
- [ ] Critical flows work
- [ ] API connections OK
- [ ] Mobile responsive
- [ ] Performance good

**Time:** 15-30 minutes testing

---

### 3️⃣ Promote to Production (Manual)

**When staging tests pass:**

1. **Go to GitHub:**
   ```
   Repository → Actions tab → Blue/Green Deployment workflow
   ```

2. **Click "Run workflow"**
   - Branch: `main`
   - Environment: `production`

3. **Click "Run workflow" button**

4. **Wait for approval:**
   - Notification sent to reviewers
   - Reviewer reviews changes
   - Reviewer clicks "Approve and deploy"

5. **Production deployment starts**

**Result:** ✅ Live on 🔵 **Production**

```
🔵 Production URL: https://lensart-production.azurestaticapps.net
```

---

## 🚀 Step-by-Step Visual Guide

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Step 1: CODE DEVELOPMENT                                   │
│  ─────────────────────────                                  │
│  👨‍💻 Developer writes code                                    │
│  📝 Commit changes                                          │
│  🔼 Push to main branch                                     │
│     ↓                                                       │
│     ↓ (Automatic)                                           │
│     ↓                                                       │
│  Step 2: STAGING DEPLOYMENT (GREEN)                         │
│  ─────────────────────────────────                          │
│  🟢 GitHub Actions triggered                                │
│  🏗️  Build application (staging config)                     │
│  🚀 Deploy to Staging environment                           │
│  ✅ Staging live at:                                        │
│     https://lensart-staging.azurestaticapps.net            │
│     ↓                                                       │
│     ↓ (Manual testing)                                      │
│     ↓                                                       │
│  Step 3: STAGING TESTING                                    │
│  ──────────────────────                                     │
│  🧪 QA Team tests features                                  │
│  ✅ Verify functionality                                    │
│  ✅ Check performance                                       │
│  ✅ Confirm no issues                                       │
│     ↓                                                       │
│     ↓ (Manual trigger)                                      │
│     ↓                                                       │
│  Step 4: PRODUCTION TRIGGER                                 │
│  ─────────────────────────                                  │
│  🎯 Team lead triggers production deploy                    │
│  📋 GitHub Actions workflow started                         │
│  ⏳ Waiting for approval...                                 │
│     ↓                                                       │
│     ↓ (Approval gate)                                       │
│     ↓                                                       │
│  Step 5: APPROVAL PROCESS                                   │
│  ───────────────────────                                    │
│  📧 Reviewer receives notification                          │
│  👀 Reviews staging environment                             │
│  👀 Reviews code changes                                    │
│  ✅ Approves deployment                                     │
│     ↓                                                       │
│     ↓ (Automatic after approval)                            │
│     ↓                                                       │
│  Step 6: PRODUCTION DEPLOYMENT (BLUE)                       │
│  ──────────────────────────────────                         │
│  🔵 Build application (production config)                   │
│  🚀 Deploy to Production environment                        │
│  ✅ Production live at:                                     │
│     https://lensart-production.azurestaticapps.net         │
│     ↓                                                       │
│     ↓                                                       │
│  Step 7: MONITORING                                         │
│  ─────────────────                                          │
│  📊 Monitor application performance                         │
│  🔍 Watch for errors                                        │
│  👥 Notify team of successful deployment                    │
│  ✅ Done!                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⏱️ Timeline

| Phase | Time | Who |
|-------|------|-----|
| Development | Variable | Developer |
| Push to main | < 1 min | Developer |
| Auto-deploy to Staging | 3-5 mins | GitHub Actions |
| Testing on Staging | 15-30 mins | QA/Developer |
| Trigger Production | < 1 min | Team Lead |
| Approval Wait | 5-60 mins | Reviewer |
| Deploy to Production | 3-5 mins | GitHub Actions |
| **Total** | **30-90 mins** | **Team** |

---

## 🔄 Rollback Procedure

### If issues found in Production:

#### Option 1: Quick Rollback (Azure Portal) ⚡ Fastest

```
1. Open Azure Portal
2. Navigate to Production Static Web App
3. Deployments tab
4. Select previous working deployment
5. Click "Promote to production"
6. ✅ Rollback complete in < 1 minute
```

#### Option 2: Git Revert

```bash
# Revert the problematic commit
git revert HEAD
git push origin main

# This will auto-deploy to staging
# Then manually promote to production
```

#### Option 3: Deploy Previous Version

```bash
# Checkout previous tag
git checkout v1.0.0

# Create new commit
git checkout -b hotfix/rollback
git push origin hotfix/rollback

# Merge to main and deploy
```

---

## 📊 Deployment Checklist

### Pre-Deployment:

- [ ] Code reviewed and approved
- [ ] Tests passing locally
- [ ] Branch up to date with main
- [ ] Breaking changes documented
- [ ] Team notified of upcoming deployment

### Staging Deployment (Auto):

- [ ] GitHub Actions workflow completed successfully
- [ ] Staging environment accessible
- [ ] No build errors
- [ ] Assets loading correctly

### Staging Testing:

- [ ] Login/Authentication works
- [ ] Main user flows tested
- [ ] API endpoints responding
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

### Production Deployment (Manual):

- [ ] Staging tests passed
- [ ] Reviewer notified
- [ ] Approval received
- [ ] Deployment triggered
- [ ] Production environment accessible
- [ ] Quick smoke test on production

### Post-Deployment:

- [ ] Production monitoring active
- [ ] No error alerts
- [ ] User reports checked
- [ ] Performance metrics normal
- [ ] Team notified of completion
- [ ] Deployment documented

---

## 🎯 Who Does What?

### Developer Role:

1. ✅ Write and test code locally
2. ✅ Push to main branch
3. ✅ Verify staging deployment
4. ✅ Perform initial testing on staging
5. ✅ Request production deployment

### QA/Tester Role:

1. ✅ Test on staging environment
2. ✅ Report any issues found
3. ✅ Give go/no-go decision
4. ✅ Verify production after deployment

### Tech Lead/Reviewer Role:

1. ✅ Review code changes
2. ✅ Review staging tests results
3. ✅ Approve production deployment
4. ✅ Monitor production after deployment
5. ✅ Make rollback decisions if needed

### DevOps Role:

1. ✅ Maintain GitHub Actions workflows
2. ✅ Manage Azure resources
3. ✅ Configure secrets and environments
4. ✅ Monitor deployment pipelines
5. ✅ Troubleshoot deployment issues

---

## 🔐 Security Gates

### Staging (Green):
- ✅ Auto-deploy from main
- ✅ No approval needed
- ✅ Fast iteration

### Production (Blue):
- ✅ Manual trigger required
- ✅ Reviewer approval required
- ✅ Wait timer (optional, 5-10 mins)
- ✅ Audit trail in GitHub

---

## 📈 Success Metrics

Track these metrics for your deployments:

```
┌─────────────────────────────────────────────────┐
│  Metric                    Target    Current    │
├─────────────────────────────────────────────────┤
│  Deployment Frequency      2-5/week  _____      │
│  Staging Test Time         < 30min   _____      │
│  Production Approval Time  < 60min   _____      │
│  Deployment Success Rate   > 98%     _____      │
│  Rollback Time            < 5min     _____      │
│  Downtime                 0 sec      _____      │
└─────────────────────────────────────────────────┘
```

---

## 🆘 Common Issues & Solutions

### Issue: Staging deployment failed

**Check:**
1. GitHub Actions logs for errors
2. Build errors locally: `npm run build:staging`
3. Environment secrets configured correctly
4. Azure Static Web App healthy

**Solution:**
```bash
# Fix the issue
git add .
git commit -m "fix: deployment issue"
git push origin main
# Will auto-retry staging deployment
```

### Issue: Production deployment stuck on approval

**Check:**
1. Reviewer received notification?
2. Reviewer has repository access?
3. GitHub Environment configured correctly?

**Solution:**
- Contact reviewer directly
- Check GitHub notifications settings
- Verify environment protection rules

### Issue: Need to rollback production

**Quick Rollback:**
1. Azure Portal → Production Static Web App
2. Deployments → Previous version
3. Click "Promote" → Done!

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| `BLUE_GREEN_DEPLOYMENT.md` | Full deployment strategy guide |
| `.github/SETUP_ENVIRONMENTS.md` | GitHub Environments setup |
| `AZURE_DEPLOYMENT.md` | Azure configuration guide |
| `QUICK_REFERENCE.md` | Quick commands reference |

---

## ✅ Quick Commands Reference

```bash
# Deploy to staging (automatic)
git push origin main

# Check staging
curl https://lensart-staging.azurestaticapps.net

# Promote to production
# → Use GitHub Actions UI

# Check production
curl https://lensart-production.azurestaticapps.net

# Rollback (if needed)
# → Use Azure Portal (fastest)
```

---

**Deployment Workflow v1.0** | Safe, Reliable, Zero-Downtime

