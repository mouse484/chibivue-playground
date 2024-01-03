import { defineConfig, normalizePath } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      chibivue: `${process.cwd()}/../../packages/chibivue`,
    },
  },
});
