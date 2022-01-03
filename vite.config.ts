import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }

  return {
    define: processEnvValues,
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(resolve(), './src'),
        "~": resolve(resolve(), './public')
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@import "./src/presentation/scss/vars";`
        },
      },
    }
  }
})
