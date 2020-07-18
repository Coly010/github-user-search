import { doSearch } from './../support/user-search.po';
describe('Happy Path', () => {
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
  it('should perform a search and display results', () => {
    doSearch();
    cy.get('.loading-bar').should('be.visible');
    cy.get('.paginator').should('be.visible');
    cy.get('.search-results').should('be.visible');
    cy.get('.user-card').first().should('include.text', 'Colum Ferry');
  });
}
