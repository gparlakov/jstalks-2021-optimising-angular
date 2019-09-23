const titleInput = ':nth-child(1) > .form-control';
const summaryInput = ':nth-child(2) > .form-control';
const articleBodyTextarea = ':nth-child(3) > .form-control';
const tagsInput = ':nth-child(4) > .form-control';
const publishButton = '.btn';

const publishedArticleHeading = 'h1';
const publishedArticleBody = 'div > p';

context('Article page for authenticated user', () => {
  /**  @type User */
  let user;

  beforeEach(() => {
    cy.login()
    cy.visit('/editor');
  })


  it('should show article form with placeholders', () => {
    cy.get(titleInput).should('have.attr', 'placeholder', 'Article Title');
    cy.get(summaryInput).should('have.attr', 'placeholder', "What's this article about?");
    cy.get(articleBodyTextarea).should(
      'have.attr',
      'placeholder',
      'Write your article (in markdown)'
    );
    cy.get(tagsInput).should('have.attr', 'placeholder', 'Enter tags');
  });

  it('should allow article publish', () => {
    cy.get(titleInput).type('E2E Article');
    cy.get(summaryInput).type('article from the e2e tests');
    cy.get(articleBodyTextarea).type(
      'E2E testing using cypress. ~~markdown should be supported~~ *it is?* **or not**?'
    );
    cy.get(tagsInput).type('e2e,cypress');
    cy.server()
      .route('POST', 'api/articles')
      .as('articlesPOST');
    cy.get(publishButton).click();

    // ensure successful POST
    cy.wait('@articlesPOST')
      .its('status')
      .should('be', 200);
    // ensure URL
    cy.url().should('include', 'article/');
    // ensure title and body (with html - from the markup we used above)
    cy.get(publishedArticleHeading).should('have.text', 'E2E Article');
    cy.get(publishedArticleBody).should(
      'have.html',
      'E2E testing using cypress. <del>markdown should be supported</del> <em>it is?</em> <strong>or not</strong>?'
    );
  });
});
