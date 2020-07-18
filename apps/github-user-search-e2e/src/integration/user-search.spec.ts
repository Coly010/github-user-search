import { doSearch } from '../support/user-search.po';

describe('User Search', () => {
  beforeEach(() => cy.visit('/'));
  describe('Desktop', () => {
    commonTestSuites();
  });

  describe('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
    });

    commonTestSuites();
  });
});

function commonTestSuites() {
  it('should search for a user and show user card', () => {
    doSearch();
    cy.get('.user-card').should('be.visible');
    cy.get('.user-card').should('include.text', 'Colum Ferry');
    cy.get('.user-card').should('include.text', 'Coly010');
    cy.get('.user-card').should('include.text', 'Repositories');
    cy.get('.user-card').should('include.text', 'Followers');
    cy.get('.user-card').should('include.text', 'Stars');
    cy.get('.avatar').should('be.visible');
  });

  it('should show validation error when no term entered', () => {
    cy.get('.search__input').click();
    cy.get('body').click();
    cy.get('.search__error').should('be.visible');
  });

  it('should allow paging through large result sets', () => {
    doSearch('something');

    cy.get('.mat-paginator-range-label').should(
      'include.text',
      '1 - 10 of 12053'
    );

    cy.get('.user-card').first().should('include.text', 'something');

    cy.get('.mat-paginator-navigation-next').click();

    cy.get('.mat-paginator-range-label').should(
      'include.text',
      '11 - 20 of 12053'
    );

    cy.get('.user-card').first().should('not.include.text', 'something');
  });

  it('should update number of results', () => {
    doSearch('something');
    cy.get('.user-card').should('have.length', 10);

    cy.get('.mat-paginator-page-size .mat-select-value').click();
    cy.get('#mat-option-1').click();

    cy.get('.user-card').should('have.length', 25);
  });

  it('should update number of results correctly after pagination', () => {
    doSearch('something');
    cy.get('.user-card').should('have.length', 10);

    cy.get('.mat-paginator-navigation-next').click();

    cy.get('.mat-paginator-page-size .mat-select-value').click();
    cy.get('#mat-option-1').click();

    cy.get('.user-card').should('have.length', 25);
  });
}
