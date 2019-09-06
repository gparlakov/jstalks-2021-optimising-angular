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

## 1. Basic testing
Demo - on the [ListErrorsComponent](./src/app/shared/list-errors.component.ts)
 1. Create a test file for the `./src/app/shared/article-helpers/article-preview.component.ts` - article-preview.component.spec.ts
 2. Construct the component in a test case and verify it actually instantiates successfully
    - no dependencies
    - simple logic
 3. Test the `toggleFavorite` with argument `true`
 4. Test the `toggleFavorite` with argument `false`

 ## 2. Basic testing - Dependencies
 DEMO - using [snippets](https://github.com/BeastCode/VSCode-Angular-TypeScript-Snippets)  to skip some of the code boilerplate

  1. Create the test file for the [AppComponent](./src/app/app.component.ts)
  2. Test cases
      - it's constructed successfully
      - when ngOnInit will call the `populate` method on the `userService`
  3. Add a dependency - the `LogService` (and/or `NotificationService`)
  4. Mock out the dependency (using spyOf / jest.fn for jasmine / jest respectively)
      ```ts
      const dep = jasmine.createSpy('test', {});
      ```

## 3. Basic testing - Using the CLI generated tests
  1. Create a new component using the `ng generate component shared/notification`
  2. Run `nmg test -- --watch`  (see the singe test pass)
  3. Update the component and test
      - Copy paste the [this](files/notifications.component.ts.help) in the notifications.component.ts
      - Add injected dependency - the `NotificationService` in the providers (why?)
  4. Add a test for the case of success and for the case of error (populates the correct input)
  5. !!//TODO Fix the jasmine.createSpy is not a function

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
