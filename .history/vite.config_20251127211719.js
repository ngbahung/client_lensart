import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Define global constants for the app
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['react-icons', 'react-toastify', 'sweetalert2'],
          }
        }
      }
    },
    
    // Development server configuration
    server: {
      port: 3000,
      proxy: {
        '/sanctum': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        },
        '/api': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      }
    },
    
    // Preview server configuration
    preview: {
      port: 3000,
    }
  }
});

