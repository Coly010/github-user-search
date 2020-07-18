describe('Page Layout', () => {
  beforeEach(() => cy.visit('/'));
  describe('Desktop', () => {
    it('should render header and footer', () => {
      cy.get('.header-bar').should('be.visible');
      cy.get('.header-bar').should('include.text', 'GitHub User Search');
      cy.get('.footer').should('be.visible');
    });

    it('should render locale change dropdown with language text', () => {
      cy.get('.locale-change').should('be.visible');
      cy.get('.hide-mobile').should('include.text', 'English');
    });

    it('should render the user search component', () => {
      cy.get('.tagline').should('be.visible');
      cy.get('.search__form').should('be.visible');
    });
  });

  describe('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
    });

    it('should render header but no footer', () => {
      cy.get('.header-bar').should('be.visible');
      cy.get('.header-bar').should('include.text', 'GitHub User Search');
      cy.get('.footer').should('not.be.visible');
    });

    it('should render locale change dropdown without language text', () => {
      cy.get('.locale-change').should('be.visible');
      cy.get('.hide-mobile').should('not.be.visible');
    });

    it('should render the user search component', () => {
      cy.get('.tagline').should('be.visible');
      cy.get('.search__form').should('be.visible');
    });
  });
});
