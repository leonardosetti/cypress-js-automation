// cypress/support/page-objects/basePage.ts
export class BasePage {
  protected baseUrl: string = Cypress.config('baseUrl') || '';

  visit(path: string = ''): this {
    cy.visit(`${this.baseUrl}${path}`);
    return this;
  }

  get(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(selector);
  }

  click(selector: string): this {
    cy.get(selector).click();
    return this;
  }

  type(selector: string, text: string): this {
    cy.get(selector).clear().type(text);
    return this;
  }

  shouldBeVisible(selector: string): this {
    cy.get(selector).should('be.visible');
    return this;
  }

  shouldContain(selector: string, text: string): this {
    cy.get(selector).should('contain', text);
    return this;
  }

  waitForNetworkIdle(): this {
    cy.wait(500);
    return this;
  }
}