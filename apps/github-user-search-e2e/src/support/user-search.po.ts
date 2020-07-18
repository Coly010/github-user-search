export const doSearch = (term = 'coly010') => {
  cy.get('.search__input').type(term);
  cy.get('.search__button').click();
};
