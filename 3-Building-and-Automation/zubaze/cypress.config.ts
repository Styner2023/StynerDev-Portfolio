import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      // Auth0 test credentials (set these in cypress.env.json)
      auth0_username: '',
      auth0_password: '',
      auth0_domain: '',
      auth0_client_id: '',
      // API endpoints
      api_url: process.env.CYPRESS_API_URL || 'https://zubaze-main-production.up.railway.app/api',
    },
  },
});
