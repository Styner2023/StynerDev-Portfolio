// ***********************************************************
// Cypress Support File
// 
// This file is processed and loaded automatically before test files.
// Use it to add global configuration and custom commands.
// ***********************************************************

/// <reference types="./commands" />

// Warm up the API/canister before running any tests
before(() => {
  const apiUrl = Cypress.env('api_url') || 'http://localhost:3001/api';
  
  cy.log('🔥 Warming up API server and canister...');
  cy.request({
    method: 'GET',
    url: `${apiUrl}/health`,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.log('✅ API is ready:', response.body.status);
      if (response.body.uptime) {
        cy.log(`   Uptime: ${response.body.uptime}`);
      }
    } else {
      cy.log('⚠️  API health check returned:', response.status);
    }
  });
});

/**
 * Custom login command for Auth0
 * 
 * This uses Auth0's programmatic login to avoid UI interaction.
 * Requires auth0_username and auth0_password in cypress.env.json
 */
// @ts-ignore - Custom command defined in commands.d.ts
Cypress.Commands.add('login', () => {
  const auth0Domain = Cypress.env('auth0_domain');
  const auth0ClientId = Cypress.env('auth0_client_id');
  const username = Cypress.env('auth0_username');
  const password = Cypress.env('auth0_password');

  if (!username || !password) {
    throw new Error(
      'Missing Auth0 credentials. Set auth0_username and auth0_password in cypress.env.json'
    );
  }

  cy.log('Logging in via Auth0...');

  // Use Auth0's authentication endpoint
  cy.request({
    method: 'POST',
    url: `https://${auth0Domain}/oauth/token`,
    body: {
      grant_type: 'password',
      username: username,
      password: password,
      client_id: auth0ClientId,
      scope: 'openid profile email',
    },
  }).then((response) => {
    const { access_token, id_token } = response.body;

    // Store tokens in session storage (matching your production auth flow)
    cy.window().then((win) => {
      win.sessionStorage.setItem('auth0_token', id_token);
      win.sessionStorage.setItem('auth0_access_token', access_token);
    });

    cy.log('✅ Logged in successfully');
  });
});

/**
 * Custom logout command
 */
// @ts-ignore - Custom command defined in commands.d.ts
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.log('✅ Logged out');
});
