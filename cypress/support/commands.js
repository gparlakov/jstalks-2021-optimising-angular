// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('register', () => {
  const randUser =
    'e2e' +
    Math.random()
      .toString(36)
      .slice(2);
  const registerUserReq = {
    email: randUser + '@my.co',
    password: 'e2gpassword',
    username: randUser
  };

  return cy
    .request('POST', `${Cypress.env('API_URL')}/users`, {
      user: registerUserReq
    })
    .its('body')
    .then(v => {
      window.localStorage.setItem('jwtToken', v.user.token);
      v.user.password = registerUserReq.password;
      return v.user;
    });
});

Cypress.Commands.add('login', u => {
  if (u == null || u.email == null || u.password == null) {
    throw new Error(
      'Need a {user: user, pass: mypass} to login! Received:' + u != null ? JSON.stringify(u) : u
    );
  }
  const userReq = { email: u.email, password: u.password };

  return cy
    .request('POST', `${Cypress.env('API_URL')}/users/login`, {
      user: userReq
    })
    .its('body')
    .then(v => {
      window.localStorage.setItem('jwtToken', v.user.token);
      return v.user;
    });
});

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('jwtToken');
});
