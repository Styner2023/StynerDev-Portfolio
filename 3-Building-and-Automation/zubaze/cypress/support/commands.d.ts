/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to handle Auth0 login
     * @example cy.login()
     */
    login(): Chainable;
    
    /**
     * Custom command to logout
     * @example cy.logout()
     */
    logout(): Chainable;
  }
}

export {};
