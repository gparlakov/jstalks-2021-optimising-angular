context('Settings page', () => {
  /**  @type User */
  let user;
  beforeEach(() => {
    cy.login().then(u => (user = u));
    cy.visit('/settings');
  });

  it('should be visible for logged in users', () => {
    cy.get('h1').should('have.text', 'Your Settings');
  });

  it('should have the user name and email pre-filled', () => {
    cy.get('[data-test=username]').should('have.value', user.username);

    cy.get('[data-test=email]').should('have.value', user.email);
  });

  it('should log out successfully', () => {
    cy.get('[data-test="logout"]')
      .click()
      .then(() => {
        expect(localStorage.getItem('jwtToken')).to.be.null;
      });
  });
});
