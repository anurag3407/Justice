import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path configuration for Vercel deployment
  base: '/',
  build: {
    outDir: 'dist',
    // Ensures Vercel can handle the build output correctly
    sourcemap: true,
    // Minify for production
    minify: 'terser',
    // CSS handling
    cssCodeSplit: true,
  },
  // Server configuration
  server: {
    // Allow connections from all network interfaces
    host: true,
    port: 5173,
    strictPort: true,
    // Proxy configuration for API requests
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Environment variable handling
  envPrefix: ['VITE_'],
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src', // This allows imports like import Component from '@/components/Component'
    },
  },
}); 