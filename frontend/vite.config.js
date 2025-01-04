import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      host: true, 
      port: 3000,
      '/api': 'http://localhost:4400'
    }
  },
  plugins: [react()],
})
