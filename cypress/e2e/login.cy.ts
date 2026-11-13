/// <reference types="cypress" />
/// <reference types="cypress-plugin-api" />

import { LoginPage } from '../support/page-objects/loginPage';

const loginPage = new LoginPage();

describe('Login Flow', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.validUser.username, users.validUser.password);
      loginPage.shouldBeLoggedIn();
    });
  });

  it('should show error with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.invalidUser.username, users.invalidUser.password);
      loginPage.shouldShowError();
    });
  });

  it('should have all required form elements', () => {
    loginPage
      .get('input[name="username"]')
      .should('be.visible');
    loginPage
      .get('input[name="password"]')
      .should('be.visible');
    loginPage
      .get('button[type="submit"]')
      .should('be.visible');
  });
});

describe('Login - Visual Regression', () => {
  it('should match login page snapshot', () => {
    loginPage.visit();
    cy.matchImageSnapshot('login-page');
  });
});