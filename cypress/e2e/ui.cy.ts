/// <reference types="cypress" />
/// <reference types="cypress-plugin-api" />

describe('UI Interaction Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load home page', () => {
    cy.document().should('have.property', 'title').and('not.be.empty');
    cy.get('body').should('be.visible');
  });

  it('should navigate via header links', () => {
    cy.get('nav a, header a').each(($link) => {
      const href = $link.attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        cy.visit(href);
        cy.get('body').should('be.visible');
        cy.go('back');
      }
    });
  });

  it('should handle form interaction', () => {
    cy.visit('/contact');
    
    cy.get('input[name="name"], #name').then(($el) => {
      if ($el.length) cy.wrap($el).type('Test User');
    });
    
    cy.get('input[name="email"], #email').then(($el) => {
      if ($el.length) cy.wrap($el).type('test@example.com');
    });
    
    cy.get('textarea[name="message"], #message').then(($el) => {
      if ($el.length) cy.wrap($el).type('Test message');
    });
    
    cy.get('button[type="submit"]').then(($btn) => {
      if ($btn.length && !$btn.is(':disabled')) {
        cy.wrap($btn).click();
        cy.wait(1000);
      }
    });
  });

  it('should be responsive', () => {
    const viewports = [
      { width: 1280, height: 720, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    viewports.forEach(({ width, height, name }) => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.get('body').should('be.visible');
      cy.screenshot(`responsive-${name}`);
    });
  });
});

describe('Network Interception', () => {
  it('should intercept API calls', () => {
    cy.intercept('GET', '/api/**').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201, 404]);
    });
  });

  it('should mock API response', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [{ id: 1, name: 'Mocked User' }],
    }).as('mockedUsers');
    
    cy.visit('/users');
    cy.wait('@mockedUsers');
    cy.contains('Mocked User').should('be.visible');
  });
});