context('Signup', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should see the signup form with 2 "text" inputs - user and email', () => {
    cy.get('form input[type="text"]')
      .its('length')
      .should('be', 2);
  });

  it('should see the signup form with 1 "password" input', () => {
    cy.get('form input[type="password"]')
      .its('length')
      .should('be', 1);
  });

  it('should create user successfully and redirect to /', () => {
    const randUser =
      'e2e' +
      Math.random()
        .toString(36)
        .slice(2);
    cy.get('[data-test=user-input]').type(randUser);
    cy.get('[data-test=email-input]').type(randUser + '@my.co');

    cy.get('[data-test=password-input]').type('e2glasswork');

    // listen for POST to /api/users
    cy.server()
      .route('POST', '/api/users')
      .as('createUser');
    cy.get('[type="submit"]').click();

    cy.wait('@createUser')
      .its('status')
      .should('be', '200');

    cy.url().should('be', '/');
  });
});
