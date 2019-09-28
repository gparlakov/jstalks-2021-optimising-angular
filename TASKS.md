# Workshop Angular

## Index

- [Setup](#setup)
- [Basic](#1-basic-testing)
  - [With Dependencies](#2-basic-testing---dependencies)

###### TODO - generate index https://ecotrust-canada.github.io/markdown-toc/

# Day 1

## Setup

- fork/clone https://github.com/gparlakov/angular-realworld-example-app

  ```bash
  git clone https://github.com/gparlakov/angular-realworld-example-app
  ```

- [_Optional_ _after 1.2_] setup jest - ([doc](https://github.com/briebug/jest-schematic#usage-))
  ```bash
  npm i -g @angular/cli @briebug/jest-schematic
  ng g @briebug/jest-schematic:add
  ```
  - if you don't want global install on any of those just use - `npx -p @angular/cli@6.2.9 ng add @briebug/jest-schematic`. That will just do the install and not leave anything in the global `npm` folder
  - TODO - `npm un @types/jasmine @types/jasminewd2` `npm i @types/jest` and change the types in tsconfig.spec.json (exclude jasmine and include jest)

## 1. Basic testing

Demo - on the [ListErrorsComponent](./src/app/shared/list-errors.component.ts)

1.  Create a test file for the `./src/app/shared/article-helpers/article-preview.component.ts` - article-preview.component.spec.ts
2.  Construct the component in a test case and verify it actually instantiates successfully
    - no dependencies
    - simple logic
3.  Test the `toggleFavorite` with argument `true`
4.  Test the `toggleFavorite` with argument `false`
5.  Review

## 2. Basic testing - Dependencies

DEMO - using [snippets](https://github.com/BeastCode/VSCode-Angular-TypeScript-Snippets) to skip some of the code boilerplate

1. Create the test file for the [AppComponent](./src/app/app.component.ts)
2. Test cases
   - it's constructed successfully
   - when ngOnInit will call the `populate` method on the `userService`
3. Mock out the dependency (using createSpy / _jest.fn_ for jasmine / _jest_ respectively)
   ```ts
   //jest
   const dep = { populate: jest:fn() }
   // jasmine
   const dep = jasmine.createSpy('UserService', ['populate']);
   ```
4. Add another dependency - the `NotificationService` (and/or `LogService`)
   - mock it and use the mock
5. Review
6. See [help](./files/src/app/app.component.spec.ts.help)

// Notes: Talk a bit about implementation details in tests

## 3. Basic testing - Using the CLI generated tests

1. Create a new component using the `ng generate component shared/notification`
2. Run `nmg test -- --watch` (see the singe test pass)
3. Update the component and test
   - Copy paste the [this](./files/src/app/shared/notifications/notifications.component.ts.help) in the notifications.component.ts
   - Add injected dependency - the `NotificationService` in the providers (why?)
4. Add a test for the case of success and for the case of error (populates the correct input) (see [help](./files/src/app/shared/notifications/notificatons.component.spec.ts.help))
5. Review

## 4. TDD Test Driven Development

1. Create a `log.service.spec.ts` \*use t-describe-it (if available)
2. Import the LogService from `./log.service`
3. Run the `npm test -- --watch log --no-cache` to run the log service tests in watch mode
4. See the failure
5. Create the `log.service` file - all green
6. Create a `it` test case that the LogService instantiates
7. See it fail - create LogService class - all green
8. Add a `it` test case that the `error` method invokes the console.log (jest module mocking)
9. See it fail - add the logic - all green
10. Add a `it` test case that when `error` invoked with an `Error` the console.log is invoked with the message
11. See it fail - add the logic - all green
12. Congrats - now you are a TDD dev!
13. Review
14. See [help](./files/src/app/core/services/log.service.spec.ts.help)

# DAY 2

## 5. Automate unit test create/update

Note - revisit the `notification.component` tests and do the setup manually.

1. Install `npm install --save-dev scuri` (or short `npm i -D scuri`)
2. Run `ng g scuri:spec src\app\shared\layout\header.component.ts`
3. Run `ng g scuri:autospy` to generate the autospy
   - move the created `auto-spy.ts` to `./src/app/auto-spy.ts`
4. Add the paths to tsconfig.json ([help](./files/tsconfig.json.help))
   ```json
   {
     "baseUrl": ".",
     "paths": {
       "autoSpy": ["./src/app/auto-spy"]
     }
   }
   ```
5. Add the path to jest.config.js (if applicable) ([help](./files/jest.config.js.help))
   ```js
    moduleNameMapper: {
      ...
      'autoSpy':'<rootDir>/src/app/auto-spy.ts'
    }
   ```
6. Run `npm test` (or `npm test -- --watch`)
7. Run `ng g scuri:spec --name ./src/app/shared/notifications.component.ts --force`
   1. [OPTIONAL] For VS Code users - Install [SCuri code](https://marketplace.visualstudio.com/items?itemName=gparlakov.scuri-code)
   2. In VS Code - command - SCuri code - create test (overwrite)
8. Review

## 6. Promise testing - async and fake async

### 6.1. Async testing

1. Create a `profile-resolver.service.spec.ts` (try using SCuri `ng g scuri:spec profile\profile-resolver.service.ts`)
2. Create a test case for `when resolve is called and the profileService.get rejects should call router.navigate("/")`
3. Use `async` to wrap it
4. Review
5. See [file](files/src/app/profile/profile-resolver.service.spec.ts.help) for help

### 6.2. Fake async testing

_Example with the `flushMicrotasks thing` article and presentation._

1. Create a `article.component.spec.ts` file with the test infrastructure - describe, it ...
2. Create a test case `when populateComments is called and getAll comments promise resolves it should set the comments to the result`
3. We need to provide a Promise and then do something on it's resolution(in the `then()` callback)
4. Add a test case for `addComments` promise resolves
5. Add a test case for `addComments` promise rejects
6. Add a test case for `deleteComment` success
7. See [help](./files/src/app/article/article.component.spec.ts.help) file

### 7. Observable testing

1. Start `user.service.spec.ts` - manually, snippet or scuri
2. Add test case `when populate called and token in localStorage and user fetch succeeds should emit the user`
3. Add test case `when populate called and token in localStorage and user fetch succeeds should emit isAuthenticated`
4. Try subscribe utility [subscribe-in-test](./src/app/testing/subscribe-in-test.ts)
5. Add test case `when populate called and empty token in localStorage should emit the empty user and isAuthenticated false`
6. Add test case `when attemptAuth called and POST succeeds should emit "success" and currentUser should also emit`
7. Add test case `when attemptAuth called and POST fails should emit the error and current user should not emit`
8. [Optional] Test the rest of the methods - `update`, `purgeAuth`(is this already tested?) and `getCurrentUser`
9. Review and See [help](./files/src/app/core/services/user.service.ts.help)

### 8. Forms / Observable testing

1. Auth component - start test (automate?)
2. Add test case for `when ngOnInit is called and url ends with 'login' should set title and authType`
3. Add test case for `when ngOnInit is called and url ends with 'register' should set title and authType and add a 'username' control`
4. Add test case `when submitForm called it should set the isSubmitting to true and clear out the errors`
5. Add test case `when submitForm called it should call attemptAuth with the auth type and credentials`
6. Add test case `when submitForm called and attemptAuth result emits it should navigate to /`
7. Add test case `when submitForm called and attemptAuth result emits error it should set errors and isSubmitting to false`
8. See [help](./files/src/app/auth/auth.component.spec.ts.help)
9. Review

# Day 3

### 9. Setup E2E

1. Install cypress `npm i cypress -D`
2. Run it `node_modules\.bin\cypress open`
   2.1. Add to package.json scripts:
   `json scripts: { ... "cypress": "cypress", "cypress.open": "npm run cypress open" }`
3. Add `{"baseUrl": "http://localhost:4200"}` to `cypress.json`
4. Add `"allowJs": true, "checkJs": true` to tsconfig.json to allow ts to check our js test files
5. [Optional] hide the examples from our dashboard by adding `  "ignoreTestFiles": "**/examples/*.*"` to `cypress.json`

### 10. Setup Smoke tests?

### Demo Auth component Sign Up
1. Demo anonymous user - should see the banner and sign up/sign in buttons
2. Demo sign-up tests [demo help](./files/cypress/integration/sign-up/sign-up.spec.js.help)

### 11. End to end tests - Sign Up
1. Create a folder in `cypress\integration\app\sign-up` and `sign-up.spec.js`
2. Create a test case `should see the sign-up form with 2 "text" inputs - user and email`
3. Create a test case `should see the sign-up form with 1 "password" input`
4. Create a test case `should create user successfully and redirect to /`
5. Review

### 12. Key to end to end tests - login
1. Create the `login` helper command - [command](./files/cypress/support/commands.js.help)
2. Add the `env: {"API_URL": "https://conduit.productionready.io/api"}` in `cypress.json`
3. Some intellisense help Add a `tsconfig.json` in `./cypress` with the following content and an `./cypress/support/index.d.ts`
    ```json
    {
      "extends": "../tsconfig.json",
      "compilerOptions": { "baseUrl": "." },
      "include": ["./support/index.d.ts"]
    }
    ```
    ```ts
    /// <reference types="cypress" />

    declare interface User {
      email: string;
      username: string;
      password: string;
    }

    declare namespace Cypress {
      interface Chainable<Subject> {
        login(): Chainable<User>;
      }
    }
    ```
### 13. Settings tests
1. Create the `./cypress/integration/settings/settings.spec.js`
    ```js
    context('Settings', () => {
      /**  @type User */
      let user;
      beforeEach(() => {
        cy.register().then(u => (user = u));
        cy.visit('/settings');
      });
    })
    ```
2. Add test case `should be visible for logged in users`
3. Add test case `should have the user name and email pre-filled`
4. Add test case `should log out successfully`
5. Review
6. See [help](files/cypress/integration/settings/sign-up.spec.js.help)

### 14. Articles
1. Create the `articles.spec.js`
2. Add test case authenticated user can see UI for writing and article
3. Add test case authenticated user can publish artice
4. Review ([help](files/cypress/integration/article/article.spec.js.help))

### 15. Comment
1. Create the `comments.spec.js`
2. Start with an article creation logic using the API (need a token first)
B3. Add test case authenticated user can comment
4. Add test case anonymous user can not comment
5. Review ([help](files/cypress/integration/comments/comments.spec.js.help))

# Day 4. Performance

### 16. Bundle size

1. Run `npm i -g webpack-bundle-analyzer` see [help](webpack-bundle-analyzer)
2. Run `ng build --prod --stats-json`
3. Run `webpack-bundle-analyzer dist/stats.json` (keep tab open for comparison)
4. Notice
    - settings and article modules not lazy
    - all moment locales - even though we need only few of them - us/ru
    - // TODO - think of how to move to a separate module | pusher - even though we need to ask user for permission
    - // TODO decide if to add it (it is a bit contrived) and make it only part of one module | PDFViewer - only used in one component but part of vendor js (no vendor in prod?)

5. Run `ng build ts --prod --common-chunk false --stats-json && webpack-bundle-analyzer dist/ts/stats.json` (notice we are building the [ts project](./projects/ts/src/app/app.component.ts))
6. Checkout the `main`, `secondary` and `third` components and see that only the used components end up in the bundles, even though using the shared module and its shared components


### 17. Lazy loading
1. Make Article module lazy
    - remove ArticleModule from AppModule
    - make the route use `loadChildren: "./article/article.module#ArticleModule"`
2. Make Settings module lazy - same steps as above
3. Note the bundles sizes change (run steps 2. and 3.)
    `ng build --prod --stats-json && webpack-bundle-analyzer dist/stats.json`
4. Review (see [app-routing.module.ts](files/src/app/app-routing.module.ts.help) and [app.module.ts](files/src/app/app.module.ts.help))

### 18. Removal of unused modules manually
1. Check out the moment locales (keep the browser tab open for comparison)
2. Add `"postinstall": "node ./tools/remove-unused-locales.js"` to `scripts` section of package.json
3. Run `npm i` to invoke the post install hook script
4. `ng build --prod --stats-json` and `webpack-bundle-analyzer ./dist/stats.json` and `` and see the bundle size differ
5. Review
// Demonstrate how to remove the moment js (or any other) locales not in use

# Day 5. State management


### N State management

// TODO test suggestion out

All 3 HomeComponent, ProfileArticlesComponent, ProfileFavoritesComponent use the articles filter functionality and separately change the filter of the article.
Home toggles between `Feed`, `Global feed` (i.e. latest) and `Tags` in the filter
ProfileArticlesComponent, ProfileFavoritesComponent toggles between `Own` and `Favorites`.
It seems the Article Service would not be ideal to keep the state (for now it's ok - since it's only shown in one place)

What could be improved - we could store the state in the ArticlesService and only inform it that an event has happened:
`onYourFeedPageEnter` would trigger the initial loading for that page and keep the result in memory.
`onYourFeedAddAuthor` would renew the cache
`onGlobalFeedEnter` would take the articles
`onGlobalFeedSelectPage` would store the selected page in the filter for that - so that we could come back to the same result
..

### O. Business logic service + state-full services

# Resources

IntelliJ plugin for snippets https://plugins.jetbrains.com/plugin/8395-angular-2-typescript-live-templates/versions

# NOTES

- FormBuilder - inject vs instantiate
  - it's a case of some logic that is really tightly coupled with the UI logic so it makes sense to instantiate the FormBuilder or the FormGroup itself
  - if we inject it and try to mock it - it is a large API surface area i.e. a lot of mocking would be required
  - injecting the actual FormBuilder in the tests is one option
  - not injecting FormBuilder and instantiating it in the component-under-test is another
- ~~looks like [article-list-component](./src/app/shared/article-helpers/article-list.component.ts) only keeps the favorites in its memory~~ The buttons components (app-favorite-button and [app-follow-button](./src/app/shared/buttons/follow-button.component.ts#L23)) actually send http requests
- AbstractDate - [FooterComponent](./src/app/shared/layout/footer.component.ts) Demo how to use wrappers around the basic DOM functionalities - Date, setTimeout, requestAnimationFrame etc.
- AuthGuardService to promise (for promise testing)
- add a service LogService - error
- add a service NotifyService - success/info/error
- talk about CI - Already doing it? AzureDevOps is great for GitHub integration.
- Pusher - Update key in app.module https://dashboard.pusher.com/apps/858014/keys, https://www.pusher.com/docs/channels/getting_started/javascript (UPDATE KEY)

# TODO

- Why jump from TestBed to setup?
  - control
  - speed (no need to compile components/for services - unneeded)
  - implementation details in tests! (mockReturnValue(of{})) and if we switch the type of response or need some extra stuff - go and change all tests for that
