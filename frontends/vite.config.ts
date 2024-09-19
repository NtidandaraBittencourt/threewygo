import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@ajna/pagination': '/node_modules/@ajna/pagination'
    }
  }

})
