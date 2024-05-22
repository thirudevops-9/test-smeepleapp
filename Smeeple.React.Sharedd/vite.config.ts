/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    envDir: '../../',
    plugins: [react(), mkcert()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './app/setupTests.ts',
    },
  };
});
