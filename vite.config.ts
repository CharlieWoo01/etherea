import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves project sites from /<repo-name>/. The deploy workflow
// sets BASE_PATH automatically; for a custom domain, build with BASE_PATH=/.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? (process.env.BASE_PATH ?? '/etherea/') : '/',
  plugins: [react(), tailwindcss()],
}))
