// cypress/support/page-objects/loginPage.ts
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private selectors = {
    usernameInput: 'input[name="username"], input[type="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMessage: '.error, .alert-danger, [role="alert"]',
    successIndicator: '.user-menu, .profile, [data-testid="user-menu"]',
  };

  visit(): this {
    return super.visit('/login');
  }

  login(username: string, password: string): this {
    this.type(this.selectors.usernameInput, username);
    this.type(this.selectors.passwordInput, password);
    this.click(this.selectors.loginButton);
    this.waitForNetworkIdle();
    return this;
  }

  getErrorMessage(): Cypress.Chainable<string> {
    return cy.get(this.selectors.errorMessage).invoke('text');
  }

  shouldBeLoggedIn(): this {
    this.shouldBeVisible(this.selectors.successIndicator);
    return this;
  }

  shouldShowError(expectedMessage?: string): this {
    this.shouldBeVisible(this.selectors.errorMessage);
    if (expectedMessage) {
      this.shouldContain(this.selectors.errorMessage, expectedMessage);
    }
    return this;
  }
}