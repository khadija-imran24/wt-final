
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Expose the server to your local network
    port: 3000, // Specify the port for the development server
    proxy: {
      '/api': {
        target: 'http://localhost:4400', // Backend server
        changeOrigin: true, // Required if the backend uses a different domain
        secure: false, // Set to true if using HTTPS locally
      },
    },
  },
  plugins: [react()],
});
