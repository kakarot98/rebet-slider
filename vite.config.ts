import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@static": resolve(__dirname, "src/assets/StaticAssets"),
      "@anim":   resolve(__dirname, "src/assets/AnimatedAssets"),
    },
  },
})
