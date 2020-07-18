describe('Locale Change', () => {
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
  it('should change language', () => {
    cy.get('.header-bar').should('include.text', 'GitHub User Search');
    cy.get('.menu-trigger').click();
    cy.get('.menu-item').contains('Español').click();
    cy.get('.header-bar').should(
      'include.text',
      'Búsqueda de usuario de GitHub'
    );
  });
}
