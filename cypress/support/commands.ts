// cypress/support/e2e.ts
import './commands';
import 'cypress-plugin-api';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      getByTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('input[name="username"], input[type="email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('getByTestId', (dataTestId: string) => {
  return cy.get(`[data-testid="${dataTestId}"]`);
});