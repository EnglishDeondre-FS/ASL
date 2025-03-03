
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  server: {
    proxy: {
      '/planets': 'http://localhost:8080',
      '/images': 'http://localhost:8080'
    }
  }
});
