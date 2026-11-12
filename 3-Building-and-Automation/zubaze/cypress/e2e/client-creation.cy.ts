/**
 * Cypress E2E Test: Client Creation Flow
 * 
 * This test verifies the entire flow of creating a client and ensuring
 * it appears in the list immediately without requiring a manual refresh.
 * 
 * It's designed to catch the "201 Created but list stays empty" bug.
 */

describe('Client Creation Flow', () => {
  beforeEach(() => {
    // Custom command to handle Auth0 login
    // See cypress/support/commands.ts for implementation
    cy.login();
  });

  it('creates a client and immediately shows it in the list', () => {
    // Intercept API calls to track request/response
    cy.intercept('GET', '/api/clients*').as('getClients');
    cy.intercept('POST', '/api/clients').as('createClient');

    // Navigate to developer dashboard
    cy.visit('/developer-dashboard');
    
    // Wait for initial client list to load
    cy.wait('@getClients').its('response.statusCode').should('eq', 200);

    // Count existing clients
    cy.get('[data-cy=client-row]').its('length').then(clientsBefore => {
      console.log(`📊 Initial client count: ${clientsBefore}`);

      // Open create client modal/form
      cy.get('[data-cy=create-client-btn]').click();
      
      // Fill in client details
      const timestamp = Date.now();
      const testName = `E2E Test Client ${timestamp}`;
      const testEmail = `e2e-${timestamp}@example.com`;
      
      cy.get('[data-cy=client-name-input]').type(testName);
      cy.get('[data-cy=client-email-input]').type(testEmail);
      
      // Submit the form
      cy.get('[data-cy=submit-client]').click();

      // Wait for create response and verify success
      cy.wait('@createClient').then(interception => {
        expect(interception.response?.statusCode).to.eq(201);
        
        const createdClient = interception.response?.body;
        console.log('✅ Client created:', createdClient);
        
        // Verify response contains expected data
        expect(createdClient).to.have.property('id');
        expect(createdClient).to.have.property('name', testName);
        expect(createdClient).to.have.property('email', testEmail);
      });

      // Wait for the automatic list refresh (triggered by invalidateQueries)
      // This should happen ~600ms after creation
      cy.wait('@getClients', { timeout: 2000 }).then(interception => {
        expect(interception.response?.statusCode).to.eq(200);
        
        const clients = interception.response?.body;
        console.log(`📊 Clients after creation: ${clients.length}`);
        
        // Verify the new client is in the list
        const newClient = clients.find((c: any) => c.name === testName);
        expect(newClient).to.exist;
        console.log('✅ New client found in list:', newClient);
      });

      // Verify UI shows the new client
      cy.get('[data-cy=client-row]').should('have.length', clientsBefore + 1);
      cy.contains(testName).should('be.visible');
      
      console.log('✅ Test passed: Client created and immediately visible');
    });
  });

  it('handles optimistic updates correctly', () => {
    cy.intercept('GET', '/api/clients*').as('getClients');
    cy.intercept('POST', '/api/clients', {
      delay: 1000, // Simulate slow backend
    }).as('createClient');

    cy.visit('/developer-dashboard');
    cy.wait('@getClients');

    cy.get('[data-cy=client-row]').its('length').then(clientsBefore => {
      cy.get('[data-cy=create-client-btn]').click();
      
      const testName = `Optimistic Test ${Date.now()}`;
      cy.get('[data-cy=client-name-input]').type(testName);
      cy.get('[data-cy=client-email-input]').type(`opt-${Date.now()}@example.com`);
      cy.get('[data-cy=submit-client]').click();

      // Verify optimistic update shows client before backend responds
      // The client should appear in the list while the request is pending
      cy.contains(testName, { timeout: 500 }).should('be.visible');
      
      // Wait for actual backend response
      cy.wait('@createClient');
      
      // Verify client still visible after backend confirmation
      cy.contains(testName).should('be.visible');
      cy.get('[data-cy=client-row]').should('have.length', clientsBefore + 1);
    });
  });

  it('handles create errors gracefully', () => {
    cy.intercept('POST', '/api/clients', {
      statusCode: 400,
      body: { error: 'Email already exists' },
    }).as('createClientError');

    cy.visit('/developer-dashboard');

    cy.get('[data-cy=create-client-btn]').click();
    cy.get('[data-cy=client-name-input]').type('Error Test');
    cy.get('[data-cy=client-email-input]').type('duplicate@example.com');
    cy.get('[data-cy=submit-client]').click();

    cy.wait('@createClientError');

    // Verify error message is shown
    cy.contains('Email already exists').should('be.visible');
    
    // Verify client was not added to the list (no optimistic update on error)
    cy.contains('Error Test').should('not.exist');
  });

  it('respects DFINITY propagation delay', () => {
    let createTime: number;
    
    cy.intercept('POST', '/api/clients').as('createClient');
    cy.intercept('GET', '/api/clients*').as('getClients');

    cy.visit('/developer-dashboard');
    cy.wait('@getClients');

    cy.get('[data-cy=create-client-btn]').click();
    cy.get('[data-cy=client-name-input]').type('Propagation Test');
    cy.get('[data-cy=client-email-input]').type('prop@example.com');
    cy.get('[data-cy=submit-client]').click();

    cy.wait('@createClient').then(() => {
      createTime = Date.now();
    });

    cy.wait('@getClients').then(interception => {
      const fetchTime = Date.now();
      const delay = fetchTime - createTime;
      
      console.log(`⏱️  Propagation delay: ${delay}ms`);
      
      // Verify the delay is at least 600ms (our configured invalidation delay)
      expect(delay).to.be.at.least(500); // Allow some margin
      
      // Verify the list includes the new client
      const clients = interception.response?.body;
      expect(clients.some((c: any) => c.name === 'Propagation Test')).to.be.true;
    });
  });
});
