describe('Blog app', function () {
  Cypress.Commands.add('addUser', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/users', { username, password });
  });

  Cypress.Commands.add('addNewBlog', (title, author, url) => {
    cy.get('input[name=title]').type(title);
    cy.get('input[name=author]').type(author);
    cy.get('input[name=url]').type(url);
  });
  Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
  });

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.addUser({ username: 'mar', password: '1234' }).then(() => {
      cy.visit('http://localhost:3000');
    });
  });
  const user = { username: 'mar', password: '1234' };
  const blog = { title: 'newBlog', author: 'mar', url: 'newWorld.com' };
  it('Login form is shown', function () {
    cy.get('.form__login').should('contain', 'username').and('contain', 'password').and('contain', 'login');
  });
  describe('login into form', function () {
    const { username, password } = user;
    it('succes with correct credentials', function () {
      cy.login(username, password);
      cy.contains(`${username} logged in`);
    });
    it('fail with wrong credentials', function () {
      cy.login(username, 'wrong-password');
      cy.contains('Error Wrong username or password');
    });
  });

  describe('When logged in', function () {
    const { title, author, url } = blog;
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it('A blog can be created', function () {
      cy.get('#button_createBlog').click();
      cy.addNewBlog(title, author, url);
      cy.get('button[type=submit]').click();
      cy.get('.blog').should('contain', title).and('contain', author);
      cy.get('.blog').parents('.blog_wraper');
    });
    it('A blog can be liked', function () {
      cy.get('#button_createBlog').click();
      cy.addNewBlog(title, author, url);
      cy.get('button[type=submit]').click();
      cy.get('.view').click();
      cy.get('.like').click();
      cy.get('.blog__likes').should('contain', 'likes : 1');
    });

    it('A blog can be deleted', function () {
      cy.get('#button_createBlog').click();
      cy.addNewBlog(title, author, url);
      cy.get('button[type=submit]').click();
      cy.get('.view').click();
      cy.get('.button--delete').click();
      cy.get('.blog').not().parents('.blog_wraper');
    });
    it('A blog cannot be deleted by user who are not onwer of that blog', function () {
      cy.addUser({ username: 'newone', password: '1234' });
      cy.get('#button_createBlog').click();
      cy.addNewBlog(title, author, url);
      cy.get('button[type=submit]').click();
      cy.get('.button__logout').click();
      cy.login('newone', '1234');
      cy.get('.view').click();
      cy.get('.button--delete').click();
      cy.get('.blog').parents('.blog_wraper');
    });
    it('Blogs are ordered by likes', function () {
      cy.get('#button_createBlog').click();
      cy.addNewBlog('FIRST', 'mar', 'newworld.com');
      cy.get('button[type=submit]').click();
      cy.wait(100);
      cy.addNewBlog('SECOND', 'mar', 'newworld.com');
      cy.get('button[type=submit]').click();
      cy.wait(500);
      cy.get('.blog').last().find('.view').click();
      cy.get('.like').click();
      cy.get('.like').click();
      cy.get('.blog').first().find('.view').click();
      cy.get('.blog').first().should('contain', 'SECOND');
      cy.get('.blog').last().should('contain', 'FIRST');
    });
  });
});
