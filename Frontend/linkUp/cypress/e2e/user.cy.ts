describe('registers a user', () => {

  it('passes registering a user', () => {
    cy.visit('/register');

    cy.get('[data-cy="userEmail"]').type('janeDoe@yopmail.com');
    cy.get('[data-cy="fullname"]').type('Jane Doe');
    cy.get('[data-cy="username"]').type('jane Doe');
    cy.get('[data-cy="userPassword"]').type('12345678');

    cy.get('[data-cy="register_user_btn"]').click();

    cy.get('[data-cy="registered-success-popup"]');
    cy.location('pathname').should('eq', '/login');
  });
});

describe('logs in a user', () => {
  it('fails login a user due to wrong email', () => {
    cy.visit('/login');

    cy.get('[data-cy="userEmail"]').type('janeDoeyopmail.com');
    cy.get('[data-cy="userPassword"]').type('12345678');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="registered-failure-popup"]');
    cy.location('pathname').should('eq', '/login');
  });

  it('fails login a user due to wrong password', () => {
    cy.visit('/login');

    cy.get('[data-cy="userEmail"]').type('jane@Doeyopmail.com');
    cy.get('[data-cy="userPassword"]').type('123456780');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="registered-failure-popup"]');
    cy.location('pathname').should('eq', '/login');
  });

  it('login a user successfully', () => {
    cy.visit('/login');

    cy.get('[data-cy="userEmail"]').type('janeDoe@yopmail.com');
    cy.get('[data-cy="userPassword"]').type('12345678');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="registered-success-popup"]');
    cy.location('pathname').should('eq', '/home');
  });
});

describe('search a user in all users', () => {
  before('', () => {
    cy.loginUser();
  });
  it('search a user', () => {
    cy.visit('/people');
    cy.get('[data-cy="searchuser"]').type('san').clear();
    cy.get('[data-cy="searchuser"]').type('dan').clear();
    cy.get('[data-cy="searchuser"]').type('rob').clear();
    cy.get('[data-cy="searchuser"]').type('man').clear();
    cy.visit('/home');
  });

  // it('should follow a user', () => {
  //   const buttonText = 'Follow';
  //   cy.get('.pdetails button').contains(buttonText).first().click();
  // });
});

describe('profile page', () => {
  beforeEach('', () => {
    cy.loginUser();
    cy.visit('/profile');
  });

  // 1. update profile

  it('should navigate to my posts', () => {
    cy.get('[data-cy="profiletop2"]').contains('Posts:').click();
    // cy.get('[data-cy="myposts"]')
  });

  it('should navigate to followers', () => {
    cy.get('[data-cy="profiletop2"]').contains('Followers:').click();
    // cy.get('app-followers')
  });

  it('should navigate to following', () => {
    cy.get('[data-cy="profiletop2"]').contains('Following:').click();
    // cy.get('app-following')
    cy.visit('/login')
  });
});

// it('fails registering a user', () => {
//   cy.visit('/register');

//   cy.get('[data-cy="userEmail"]').type('jane@Doeyopmail.com');
//   cy.get('[data-cy="fullname"]').type('Jane Doe');
//   cy.get('[data-cy="username"]').type('jane Doe');
//   cy.get('[data-cy="userPassword"]').type('1234');

//   cy.get('[data-cy="register_user_btn"]').click();

//   cy.get('[data-cy="registered-failure-popup"]');
//   cy.location('pathname').should('eq', '/register');
// });

// describe('add comment', () => {
//   before('', () => {
//     cy.loginUser();
//   });
//   it('adds a comment', () => {
//     cy.get('[data-cy="allPosts"]').first()
//   });
// });
