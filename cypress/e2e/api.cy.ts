/// <reference types="cypress" />
/// <reference types="cypress-plugin-api" />

describe('API Tests', () => {
  const apiUrl = Cypress.env('apiUrl') || 'https://api.example.com';

  it('GET /health - should return healthy status', () => {
    cy.api({
      method: 'GET',
      url: `${apiUrl}/health`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'healthy');
    });
  });

  it('GET /api/users - should return users list', () => {
    cy.api({
      method: 'GET',
      url: `${apiUrl}/api/users`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('POST /api/users - should create user', () => {
    cy.fixture('users').then((users) => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/api/users`,
        body: users.apiUser,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body).to.have.property('name', users.apiUser.name);
        expect(response.body).to.have.property('id');
      });
    });
  });

  it('GET /api/nonexistent - should return 404', () => {
    cy.api({
      method: 'GET',
      url: `${apiUrl}/api/nonexistent`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});