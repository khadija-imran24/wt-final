
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ramsha-da-project-backend.vercel.app/', // Backend server
        changeOrigin: true, // Required if the backend uses a different domain
        secure: false, // Set to true if using HTTPS locally
      },
    },
  },
  plugins: [react()],
});
