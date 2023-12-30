import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/frontend_vue3_cadastro_de_profissionais/' : '/',
  plugins: [vue()],
})
