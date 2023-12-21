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
  it('clicks on link', () => {
    cy.visit('http://localhost:4200/register');
    cy.get('[data-cy="accountyes"]').click();
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
  it('clicks on link for forgot password', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-cy="forgot"]').click();
  });
  it('clicks on link for dont have account', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-cy="noaccount"]').click();
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
});

describe('profile page', () => {
  beforeEach('', () => {
    cy.loginUser();
    cy.visit('/profile');
  });

  // it('should update user profile', () => {
  //   cy.get('[data-cy="profiletop1"]').get('[data-cy="updateProfile"]').click();
  //   cy.wait(30000);
  //   cy.get('#profileform').should('be.visible');

  // })

  it('should navigate to my posts', () => {
    cy.get('[data-cy="profiletop2"]').contains('Posts:').click();
    // cy.wait(5000)
    // cy.get('[data-cy="myposts"]')
  });

  it('should navigate to followers', () => {
    cy.get('[data-cy="profiletop2"]').contains('Followers:').click();
    // cy.get('app-followers')
  });

  it('should navigate to following', () => {
    cy.get('[data-cy="profiletop2"]').contains('Following:').click();
    // cy.get('app-following')
    cy.visit('/login');
  });
});

describe('followers page', () => {
  beforeEach('', () => {
    cy.loginUser();
    cy.visit('http://localhost:4200/followers');
  });
  it('search a user', () => {
    cy.get('[data-cy="searchuser"]').type('san').clear();
    cy.get('[data-cy="searchuser"]').type('dan').clear();
    cy.get('[data-cy="searchuser"]').type('rob').clear();
    cy.get('[data-cy="searchuser"]').type('man').clear();
    cy.visit('/login');
  });
});

describe('followings page', () => {
  beforeEach('', () => {
    cy.loginUser();
    cy.visit('http://localhost:4200/following');
  });
  it('search a user', () => {
    cy.get('[data-cy="searchuser"]').type('san').clear();
    cy.get('[data-cy="searchuser"]').type('dan').clear();
    cy.get('[data-cy="searchuser"]').type('rob').clear();
    cy.get('[data-cy="searchuser"]').type('man').clear();
    cy.visit('/login');
  });
});

describe('forgot passwords', () => {
  it('forgot password', () => {
    cy.visit('http://localhost:4200/reset');
    cy.get('[data-cy="resetForm"]')
      .get('[data-cy="email"]')
      .type('devngecu@gmail.com');
    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[class="success-message"]');
    cy.location('pathname').should('eq', '/forgot');

    // cy.visit('/login');
  });
  it('clicks on link', () => {
    cy.visit('http://localhost:4200/reset');
    cy.get('[data-cy="remember"]').click();
  });
});

describe('reset password', () => {
  it('reset password', () => {
    cy.visit('http://localhost:4200/forgot');
    cy.get('[data-cy="resetForm"]')
      .get('[data-cy="email"]')
      .type('devngecu@gmail.com');

    cy.get('[data-cy="resetForm"]')
      .get('[data-cy="token"]')
      .type('qwertyuiasdfghjkxcvbnm');

    cy.get('[data-cy="resetForm"]')
      .get('[data-cy="userPassword"]')
      .type('12345678');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[class="success-message"]');

    cy.location('pathname').should('eq', '/login');

    // cy.visit('/login');
  });
});
