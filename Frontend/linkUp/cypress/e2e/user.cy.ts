describe('registers a user', () => {
  it('registers a user', () => {
    cy.visit('/register');

    cy.get('[data-cy="userEmail"]').type('janeDoe@yopmail.com');
    cy.get('[data-cy="fullname"]').type('Jane Doe');  
    cy.get('[data-cy="username"]').type('janedoe123');
    cy.get('[data-cy="userPassword"]').type('12345678');

    cy.get('[data-cy="register_user_btn"]').click();

    cy.get('[data-cy="registered-success-popup"]');
    cy.location('pathname').should('eq', '/login');
  });
});
