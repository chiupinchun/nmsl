import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  build: {
    outDir: 'docs'
  },
  base: '/nmsl-admin/',
  server: {
    host: '0.0.0.0'
  }
});
