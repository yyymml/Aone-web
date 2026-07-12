import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Aone-web/',
  plugins: [
    react(),
    {
      name: 'inject-csp',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">`
        )
      }
    }
  ],
  build: {
    terserOptions: {
      compress: {
        drop_eval: true
      }
    }
  }
})
