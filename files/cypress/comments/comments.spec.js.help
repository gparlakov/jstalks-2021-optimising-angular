context('Comments', () => {
  /**  @type User */
  let user;

  /** @type Article */
  let article;
  before(() => {
    cy.register()
      .then(u => {
        user = u;
        return cy.request({
          method: 'POST',
          url: `${Cypress.env('API_URL')}/articles`,
          body: {
            article: {
              title: 'E2E article via API',
              body: 'My e2e shortcut article',
              description: 'Short e2e desc'
            }
          },
          headers: { Authorization: `Token ${u.token}` }
        });
      })
      .then(r => {
        article = r.body.article;
        return r;
      });
  });

  context('for authenticated users', () => {
    beforeEach(() => {
      cy.login(user);
      cy.visit(`/article/${article.slug}`);
    });

    it('commenting should be available', () => {
      cy.get('textarea').type('my comment');
      cy.server()
        .route('POST', 'comments')
        .as('postComment');
      cy.get('[data-testid="submit-comment"]').click();
      cy.wait('@postComment');
    });
  });

  context('for anonymous users', () => {
    beforeEach(() => {
      cy.logout();
      cy.server()
        .route('GET', `api/articles/${article.slug}`)
        .as('getArticles');

      cy.visit(`/article/${article.slug}`);
    });
    it('commenting should not be available', () => {
      cy.wait('@getArticles')
        .its('status')
        .should('be', 200);

      cy.get('textarea').should('not.be.visible');
      cy.get('[data-testid="submit-comment"]').should('not.be.visible');
    });

    it('should prompt user to sign in or sign up to comment', () => {
      cy.wait('@getArticles')
        .its('status')
        .should('be', 200);

      cy.get('[data-test-id="auth-to-comment"]').should('include.text', 'Sign in or sign up to add comments on this article. ')
    });
  });
});
