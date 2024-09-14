import react from '@vitejs/plugin-react';
import path from 'path';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vike({}), react({})],
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, 'backend'),
      '@frontend': path.resolve(__dirname, 'frontend'),
      '@type': path.resolve(__dirname, 'types'),
    },
  },
});
