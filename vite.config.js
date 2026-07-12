import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Aone-web/',
  plugins: [react()],
  build: {
    terserOptions: {
      compress: {
        drop_eval: true
      }
    }
  }
})
