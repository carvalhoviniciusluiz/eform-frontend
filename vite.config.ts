import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      }
    },
    {},
  )

  return {
    define: envWithProcessPrefix,
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
  }
})
