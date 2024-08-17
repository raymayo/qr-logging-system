import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    https:{
      key:'./cert/cert.key',
      cert:'./cert/cert.crt'
    }
  },
  optimizeDeps: {
    // exclude: ['react-dom','qrcode.react']
  }
})
