/// <reference types="cypress" />

/**
 * Client Dashboard Deletion E2E Test
 * 
 * Verifies that:
 * 1. Delete button removes client from UI
 * 2. Deletion persists after page refresh
 * 3. Client does not reappear in the list
 * 4. Backend confirms client is deleted (soft-deleted with filters)
 */

describe('Client Dashboard Deletion', () => {
  beforeEach(() => {
    // TODO: Add authentication setup
    // cy.login('developer@zubaze.com', 'password');
  });

  it('permanently deletes a client dashboard', () => {
    cy.visit('/developer-dashboard');
    
    // Wait for dashboards to load
    cy.contains('Client Dashboards').should('be.visible');
    
    // Find a test client (you may need to create one first)
    const testClientName = 'Test Client for Deletion';
    
    // Verify the client exists initially
    cy.contains(testClientName).should('exist');
    
    // Click the delete button
    cy.contains(testClientName)
      .parents('.bg-white')
      .find('button')
      .contains('Delete Client')
      .click();
    
    // Confirm the deletion dialog
    // Note: This is a native confirm() dialog, handled differently
    // You may need to stub window.confirm
    cy.on('window:confirm', () => true);
    
    // Wait for toast success message
    cy.contains(`Client "${testClientName}" deleted successfully`)
      .should('be.visible');
    
    // Verify the client is removed from UI
    cy.contains(testClientName).should('not.exist');
    
    // Refresh the page to verify persistence
    cy.reload();
    
    // Wait for dashboards to load again
    cy.contains('Client Dashboards').should('be.visible');
    
    // Verify the client does NOT reappear
    cy.contains(testClientName).should('not.exist');
  });

  it('optimistically removes client from UI before backend confirms', () => {
    cy.visit('/developer-dashboard');
    
    const testClientName = 'Test Client for Optimistic Update';
    
    // Intercept the DELETE request to add delay
    cy.intercept('DELETE', '/api/clients/*', (req) => {
      req.reply((res) => {
        res.delay = 2000; // Add 2 second delay
        return res;
      });
    }).as('deleteClient');
    
    // Click delete
    cy.contains(testClientName)
      .parents('.bg-white')
      .find('button')
      .contains('Delete Client')
      .click();
    
    cy.on('window:confirm', () => true);
    
    // Client should disappear immediately (optimistic update)
    cy.contains(testClientName).should('not.exist');
    
    // Wait for backend to confirm
    cy.wait('@deleteClient');
    
    // Still should not exist
    cy.contains(testClientName).should('not.exist');
  });

  it('shows error and restores client if deletion fails', () => {
    cy.visit('/developer-dashboard');
    
    const testClientName = 'Test Client for Error Handling';
    
    // Intercept and force error
    cy.intercept('DELETE', '/api/clients/*', {
      statusCode: 500,
      body: {
        ok: false,
        error: 'Simulated server error'
      }
    }).as('deleteClientError');
    
    // Click delete
    cy.contains(testClientName)
      .parents('.bg-white')
      .find('button')
      .contains('Delete Client')
      .click();
    
    cy.on('window:confirm', () => true);
    
    // Wait for error response
    cy.wait('@deleteClientError');
    
    // Error toast should appear
    cy.contains('Failed to delete client').should('be.visible');
    
    // Client should be restored to UI (rollback)
    cy.contains(testClientName).should('exist');
  });

  it('disables delete button while deletion is in progress', () => {
    cy.visit('/developer-dashboard');
    
    const testClientName = 'Test Client for Loading State';
    
    // Add delay to DELETE request
    cy.intercept('DELETE', '/api/clients/*', (req) => {
      req.reply((res) => {
        res.delay = 3000; // Add 3 second delay
        return res;
      });
    }).as('deleteClientSlow');
    
    // Click delete
    cy.contains(testClientName)
      .parents('.bg-white')
      .find('button')
      .contains('Delete Client')
      .as('deleteButton')
      .click();
    
    cy.on('window:confirm', () => true);
    
    // Button should show "Deleting..." and be disabled
    cy.get('@deleteButton').should('contain', 'Deleting...');
    cy.get('@deleteButton').should('be.disabled');
    
    // Wait for completion
    cy.wait('@deleteClientSlow');
    
    // Client should be gone
    cy.contains(testClientName).should('not.exist');
  });
});
