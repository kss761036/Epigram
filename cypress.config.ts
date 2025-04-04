import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';

loadEnvConfig(process.cwd());

export default defineConfig({
  env: {
    database_url: process.env.NEXT_PUBLIC_BASE_URL,
    test_email: process.env.CY_TEST_EMAIL,
    test_password: process.env.CY_TEST_PW,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
