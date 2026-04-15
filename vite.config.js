import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:18789',
        changeOrigin: true,
        secure: false,
        // HAPUS atau KOMENTARI baris rewrite di bawah ini:
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
    // ----------------------------
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})