context('Comments', () => {
  /**  @type User */
  let user;

  /** @type Article */
  let article;
  before(() => {
    cy.register().then(u => {
      user = u;
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/articles`,
        body: {
          article: { title: 'E2E article via API', body: 'My e2e shortcut article', description: "Short e2e desc" }
        },
        headers: { Authorization: `Token ${u.token}` }
      })
    })
    .then(r => {
      article = r.body.article;
      return r;
    });
  });

  beforeEach(() => {
    cy.visit(`/article/${article.slug}`)
  });

  it('should be available for authenticated users', () => {
    console.warn('user and article', user, article)
    // cy.get('test');
  });
});
