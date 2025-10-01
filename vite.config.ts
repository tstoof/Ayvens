// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // or react, etc.
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom', // or 'node' if you're not testing DOM
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
})
