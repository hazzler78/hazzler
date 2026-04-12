import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite does not run /api/* — proxy to production so Latest Frequencies works in local dev.
    proxy: {
      '/api/latest-youtube': {
        target: 'https://hazzler.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
