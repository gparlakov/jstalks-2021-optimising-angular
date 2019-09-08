# Workshop Angular

## Index

- [Setup](#setup)
- [Basic](#1-basic-testing)
  - [With Dependencies](#2-basic-testing---dependencies)

###### TODO - generate index https://ecotrust-canada.github.io/markdown-toc/

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
   - mock it and include it in the TestBed
5. Review

// TODO - test out the points

## 3. Basic testing - Using the CLI generated tests

1. Create a new component using the `ng generate component shared/notification`
2. Run `nmg test -- --watch` (see the singe test pass)
3. Update the component and test
   - Copy paste the [this](files/notifications.component.ts.help) in the notifications.component.ts
   - Add injected dependency - the `NotificationService` in the providers (why?)
4. Add a test for the case of success and for the case of error (populates the correct input) (see [help](./files/notificatons.component.spec.ts.help))
5. Review of 3

## 4. Automate unit test create/update

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

7. [OPTIONAL] For VS Code users - Install [SCuri code](https://marketplace.visualstudio.com/items?itemName=gparlakov.scuri-code)

## 5. TDD
// TODO - try it out
1. Create a `log.service.spec.ts` *use t-describe-it (if available)
2. Import the LogService from `./log.service`
3. Run the `npm test -- --watch log` to run the log service tests in watch mode
4. See the failure
5. Create the `log.service` file - all green
6. Create a `it` test case that the LogService instantiates
7. See it fail - create LogService class - all green
8. Add a `it` test case that the LogService has a `error` method
9. See it fail - create the `error` method - all green
10. Add a `it` test case that the `error` method invokes the console.log (jest module mocking)
11. See it fail - add the logic - all green
12. Congrats - now you are a TDD dev!

6. Promise testing - async and fake async

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
