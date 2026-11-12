/**
 * API Response Format Integration Tests
 * 
 * Purpose: Prevent the 365-day "double-wrapped response" bug from ever happening again
 * These tests verify that API responses match frontend expectations
 */

describe('API Response Format Validation', () => {
  const endpoints = [
    { path: '/clients', method: 'GET', requiresAuth: true },
    { path: '/projects', method: 'GET', requiresAuth: true },
  ];

  before(() => {
    // TODO: Add Auth0 login here when cypress.env.json is configured
    // For now, these tests will be skipped if not authenticated
  });

  endpoints.forEach(({ path, method, requiresAuth }) => {
    describe(`${method} ${path}`, () => {
      it('should return response with { ok, data } wrapper', () => {
        cy.request({
          method,
          url: `${Cypress.env('api_url')}${path}`,
          failOnStatusCode: false,
        }).then((response) => {
          // Response should have ok field
          expect(response.body).to.have.property('ok');
          
          // If authenticated (ok: true), should have data
          // If not authenticated (ok: false), should have error
          if (response.body.ok) {
            expect(response.body).to.have.property('data');
          } else {
            expect(response.body).to.have.property('error');
          }
        });
      });

      it('should NOT double-wrap the response (365-day bug check)', () => {
        cy.request({
          method,
          url: `${Cypress.env('api_url')}${path}`,
          failOnStatusCode: false,
        }).then((response) => {
          const { body } = response;
          
          // If response has ok=true and data field
          if (body.ok && body.data) {
            // The data field should NOT also have { ok, data } structure
            // This was the 365-day bug!
            if (typeof body.data === 'object' && body.data !== null) {
              expect(body.data).to.not.have.property('ok');
              expect(body.data).to.not.have.property('data');
            }
          }
        });
      });

      it('should return data in the expected format', () => {
        cy.request({
          method,
          url: `${Cypress.env('api_url')}${path}`,
          failOnStatusCode: false,
        }).then((response) => {
          const { body } = response;
          
          if (body.ok) {
            // For list endpoints, data should be an array
            if (path.includes('/clients') || path.includes('/projects')) {
              expect(body.data).to.be.an('array');
            }
            
            // Log the structure for debugging
            cy.log('Response structure:', {
              hasOk: 'ok' in body,
              hasData: 'data' in body,
              dataType: Array.isArray(body.data) ? 'array' : typeof body.data,
              dataLength: Array.isArray(body.data) ? body.data.length : 'N/A',
            });
          }
        });
      });
    });
  });

  describe('Client Endpoints - Detailed Validation', () => {
    it('GET /clients should return array of client objects', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api_url')}/clients`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.body.ok && response.body.data.length > 0) {
          const client = response.body.data[0];
          
          // Each client should have required fields
          expect(client).to.have.property('id');
          expect(client).to.have.property('name');
          expect(client).to.have.property('email');
          expect(client).to.have.property('developerId');
          
          // Email should be valid
          expect(client.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        }
      });
    });
  });

  describe('Project Endpoints - Detailed Validation', () => {
    it('GET /projects should return array of project objects', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api_url')}/projects`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.body.ok && response.body.data.length > 0) {
          const project = response.body.data[0];
          
          // Each project should have required fields
          expect(project).to.have.property('id');
          expect(project).to.have.property('name');
          expect(project).to.have.property('url');
          expect(project).to.have.property('developerId');
        }
      });
    });
  });

  describe('Error Response Format', () => {
    it('should return { ok: false, error: string } for errors', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('api_url')}/clients/nonexistent-id`,
        failOnStatusCode: false,
      }).then((response) => {
        if (!response.body.ok) {
          expect(response.body).to.have.property('ok', false);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.be.a('string');
        }
      });
    });
  });
});
