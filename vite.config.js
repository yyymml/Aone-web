import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 下面这一行是新增的，仓库名严格匹配你的项目名 Aone-web
  base: '/Aone-web/',
  plugins: [vue()],
})
