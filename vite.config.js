import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Aone-web/',
  plugins: [react()],
  build: {
    terserOptions: {
      compress: {
        drop_eval: true // 移除所有eval代码，规避CSP拦截
      }
    }
  }
})
