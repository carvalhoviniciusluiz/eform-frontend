import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(resolve(), './src'),
      "~": resolve(resolve(), './public')
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "./public/styles";` },
    },
  }
})
