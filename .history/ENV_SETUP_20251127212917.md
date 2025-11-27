# 🔧 Environment Variables Setup

## Quick Start

### 1. Copy environment file
```bash
# For local development
cp .env.example .env

# The .env file is gitignored and safe for local secrets
```

### 2. Update values in `.env`
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_ENV=development
VITE_APP_NAME=LensArt
VITE_APP_VERSION=1.0.0
```

### 3. Start development server
```bash
npm run dev
```

---

## Environment Files Structure

```
📁 Root Directory
├── .env                      ← Your local config (gitignored) ✅ CREATE THIS
├── .env.development          ← Development defaults (gitignored)
├── .env.staging             ← Staging config (gitignored)
├── .env.production          ← Production config (gitignored)
├── .env.example             ← Template to share (committed) ✓
└── .env.local.example       ← Local override template (committed) ✓
```

---

## Available Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API endpoint | `http://127.0.0.1:8000/api` |
| `VITE_APP_ENV` | Environment name | `development` / `staging` / `production` |
| `VITE_APP_NAME` | Application name | `LensArt` |
| `VITE_APP_VERSION` | App version | `1.0.0` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APPINSIGHTS_INSTRUMENTATIONKEY` | Azure App Insights | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

---

## Different Environments

### 🔵 Development (Local)

**File**: `.env` or `.env.development`

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_APP_ENV=development
```

**Run**:
```bash
npm run dev
```

---

### 🟡 Staging

**File**: `.env.staging`

```env
VITE_API_BASE_URL=https://your-staging-api.azurewebsites.net/api
VITE_APP_ENV=staging
```

**Build**:
```bash
npm run build:staging
```

**Preview**:
```bash
npm run preview:staging
```

---

### 🟢 Production

**File**: `.env.production`

```env
VITE_API_BASE_URL=https://your-production-api.azurewebsites.net/api
VITE_APP_ENV=production
```

**Build**:
```bash
npm run build
```

**Preview**:
```bash
npm run preview:production
```

---

## Using Environment Variables in Code

### In JavaScript/JSX files:

```javascript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appEnv = import.meta.env.VITE_APP_ENV;
const appName = import.meta.env.VITE_APP_NAME;

// Check environment
if (import.meta.env.VITE_APP_ENV === 'production') {
  console.log = () => {}; // Disable logs in production
}

// Example usage
console.log('API URL:', apiUrl);
console.log('Environment:', appEnv);
```

### In vite.config.js:

```javascript
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Use env variables
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL?.replace('/api', ''),
        }
      }
    }
  }
});
```

---

## Important Notes

### ⚠️ Security

1. **NEVER commit** `.env`, `.env.development`, `.env.staging`, or `.env.production`
2. **ONLY commit** `.env.example` and `.env.*.example` files
3. All variables must start with `VITE_` to be exposed to the client
4. Don't store sensitive secrets (API keys, passwords) in environment variables that go to the frontend

### 🔄 When to Restart

Changes to `.env` files require **restarting the dev server**:

```bash
# Stop server (Ctrl+C)
# Then restart
npm run dev
```

### 🌐 Browser Access

Environment variables are **embedded at build time** and can be seen in:
- Browser DevTools
- Source code
- Network requests

**DO NOT** store sensitive data like:
- ❌ Database passwords
- ❌ Private API keys
- ❌ Authentication secrets

**ONLY** store:
- ✅ Public API endpoints
- ✅ Feature flags
- ✅ Public configuration

---

## Testing Environment Variables

### Create a test file:

```javascript
// src/utils/envTest.js
export const testEnv = () => {
  console.log('=== Environment Variables ===');
  console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('Environment:', import.meta.env.VITE_APP_ENV);
  console.log('App Name:', import.meta.env.VITE_APP_NAME);
  console.log('Version:', import.meta.env.VITE_APP_VERSION);
  console.log('Mode:', import.meta.env.MODE);
  console.log('Dev Mode:', import.meta.env.DEV);
  console.log('Prod Mode:', import.meta.env.PROD);
  console.log('============================');
};
```

### Call in your app:

```javascript
// src/App.jsx
import { testEnv } from './utils/envTest';

function App() {
  // Test on mount
  useEffect(() => {
    testEnv();
  }, []);
  
  return <div>Your App</div>;
}
```

---

## Troubleshooting

### Variables are undefined

**Problem**: `import.meta.env.VITE_MY_VAR` returns `undefined`

**Solutions**:
1. Check variable name starts with `VITE_`
2. Restart dev server
3. Clear cache: `rm -rf node_modules/.vite`
4. Rebuild: `npm run build`

### Wrong environment loaded

**Problem**: Production config loaded in development

**Solutions**:
1. Check `--mode` flag in package.json scripts
2. Verify `.env.{mode}` file exists
3. Check file naming (`.env.production` not `.env.prod`)

### Variables not working in build

**Problem**: Works in dev but not in production build

**Solutions**:
1. Ensure variables are set in `.env.production`
2. Or set in GitHub Secrets for CI/CD
3. Or configure in Azure Static Web Apps settings

---

## For Azure Deployment

See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for complete deployment guide.

### Quick Reference:

1. **GitHub Secrets** (Recommended):
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Add: `VITE_API_BASE_URL`, `VITE_APP_ENV`, etc.

2. **Azure Portal**:
   - Go to: Static Web App → Configuration
   - Add environment variables

3. **Build Script**:
   ```yaml
   # .github/workflows/azure-static-web-apps.yml
   env:
     VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
     VITE_APP_ENV: ${{ secrets.VITE_APP_ENV }}
   ```

---

## Need Help?

- 📖 [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-mode.html)
- 📖 [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- 📖 See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for deployment guide

---

**Happy Coding! 🚀**

