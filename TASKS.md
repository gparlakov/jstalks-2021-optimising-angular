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

  TODO - cut a branch and then delete all the task results - spec files etc.

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
2. Run `npm test -- --watch` (see the singe test pass)
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

_Example with the [flushMicrotasks thing](https://medium.com/ng-gotchas/what-was-that-flushmicrotasks-thing-again-4cfae7ba5fac) article and presentation._

1. Create a `article.component.spec.ts` file with the test infrastructure - `describe` with an `it` ...
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

1. `auth.component` - start test (automate?)
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
2. Run it `npx cypress open` or `node_modules\.bin\cypress open`
   2.1. Add to package.json scripts:
   `json scripts: { ... "cypress": "cypress", "cypress.open": "npm run cypress open" }`
3. Add `{"baseUrl": "http://localhost:4200"}` to `cypress.json`
4. Add `"allowJs": true, "checkJs": true` to tsconfig.json to allow ts to check our js test files
5. [Optional] hide the examples from our dashboard by adding `"ignoreTestFiles": "**/examples/*.*"` to `cypress.json`

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
   });
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
3. Add test case anonymous user can not comment
4. Review ([help](files/cypress/integration/comments/comments.spec.js.help))

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

5. Explore what Angular does automatically with the tree shaker
   - Run `ng build ts --prod --common-chunk false --stats-json && webpack-bundle-analyzer dist/ts/stats.json` (notice we are building the [ts project](./projects/ts/src/app/app.component.ts))
   - Checkout the `main`, `secondary` and `third` components and see that **only** the used components end up in the bundles, even though using the shared module and its shared components
6. Demo what Ivy does for us in terms of performance. **Angular 8** requires **node 10** so either use Docker or install Node 10 locally
   - for local build
     - `ng update @angular/cli @angular/core`
     - `ng build ts --prod --common-chunk false --stats-json` (notice we build `ts` app))
     - `webpack-bundle-analyzer dist/ts/stats-es2015.json`
     - navigate to `localhost:8888`
   - for docker demo
     - `docker run -p 8888:8888 gparlakov/demo-ivy`
     - navigate to `localhost:8888`

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

### 19. Manual JS lazy module load

1. Notice the `Pusher` is a large part of our main bundle. Turns out the user needs to agree for us to send them notifications. Let's make the pusher module lazy loaded - that's a JavaScript module (vs Angular Module - which gets lazy loaded via Routes primarily though there are [options](https://www.npmjs.com/package/@herodevs/hero-loader))
2. Notice [pusher-service.ts](src/app/core/services/pusher.service.ts). It imports the Pusher library - no matter if anyone uses it or not:
   (i.e. if `I want notifications` has been pressed)
   `ts import * as Pusher from 'pusher-js';`
3. In order to lazy load that module we need to:
   - change the `module` setting in `tsconfig.app.json` to `esnext`
     ```json
     "module": "esnext"
     ```
   - replace `getPusherInstance` method in pusher service with:
     ```ts
       private getPusherInstance() {
         return import('pusher-js').then((p: any) => {
           if (this.instance == null) {
             // we know this is imported as { default: PusherStatic } contrary to what our import types this as
             const Pusher: Pusher.PusherStatic = p.default;
             this.instance = new Pusher(this.key, this.config);
           }
           return this.instance;
         });
       }
     ```
4. Now run the `ng build --prod --stats-json && webpack-bundle-analyzer dist/stats.json` and notice now Pusher has its own bundle
5. Review (see [help](files/src/app/core/services/pusher.service.ts.help))

### 20. Angular performance - trackBy

1. Notice the /admin route of the app. Interact with the controls on the left (width, height, by) and notice the updating count of all components. That's because we keep changing the referenced objects filtered and updated by the [admin-article.service](src/app/admin/admin-article.service.ts#l23) with the input provided in the admin-article-visualize-control.component (i.e. the aforementioned controls - width, height, by).
2. Add a `articleSlug` property in the `admin-article-list.component`
3. Let it be of type `TrackByFunction<AdminArticle>`
4. Assign a function to the property that accepts index and an item if type `AdminArticle` and return the slug of the article.
5. Now notice the template of `admin-article-list.component`.
6. Add a `;trackBy=articleSlug` to the end of the `*ngFor` declaration. That will instruct Angular to take the returned value and check that for equality with the previous one instead of just comparing object references.
7. Notice how the controls no longer cause the redrawing of the whole list and rather make the existing components change.
8. Review (for help see [component](files/src/app/admin/admin-article-list/admin-articles-list.component.ts.help) and [template](files/src/app/admin/admin-article-list/admin-articles-list.component.html.help))

### 21. Angular performance - OnPush

1. Notice the `/admin/on-push` route. See how writing in the input triggers change detection in all of the `admin-article.component`-s with no visible changes.
2. This happens because the ngFor difference strategy relies on object reference comparison and since `admin-article.service` emits a new object every time, Angular has to destroy the component and create a new one for the new object reference. We **`can`** affect that by the `trackBy` input of the ngFor structural directive
3. Adjust the change detection strategy of the `admin-article.component` to on-push.
4. Try typing in the input again and notice if the change detection is triggered in the article
5. Review (for help see [admin-article.component.ts.help](files/src/app/admin/admin-article/admin-article.component.ts.help))

### 22. Angular performance - debounce

1. Notice the `/admin/debounce` route.

2. The `admin-search.component` initializes the search by providing the changes observable. Then the `admin-article.service` will construct the (mock) request out of each emission of that observable.
3. The effect is manifested by typing in the search resulting in a **request** for **each** typed character
4. Apply the `debounceTime` operator in the `admin-search.component` (ex `debounceTime(400)`)
5. Notice that the request waits for you to finish writing before sending the request (mock request)
6. Review (for help see [component](files/src/app/admin/admin-search/admin-search.component.ts.help))

# Day 5. State management

### 23. State management basic

1. Go to https://angular.io/generated/live-examples/getting-started/stackblitz.html and get to know the app
2. Implement the following feature
   - show the number of items next to the `Checkout` button <img src ="./files/button.png" width="100" alt="![huhh! the button.png is missing]"></img>
3. Steps:

   - notice the state being kept in the `CartService`
   - notice the button being part of the `TopBarComponent`
   - inject the `CartService` in the `TopBarComponent`
   - populate a `itemsCount` property with `cartService.getItems().length`
   - notice that no changes are happening - why is that?
   - implement a `ngDoCheck` method (when does it get called?)
   - inside re- populate a `itemsCount` property with `cartService.getItems().length` (i.e. `this.itemsCount = this.cartService.getItems().lenght`)

4. Review.
   - For help see [final result](https://stackblitz.com/edit/angular-data-simple-angular-advanced-workshop-kiev?file=src/app/top-bar/top-bar.component.ts)

### 24. State management - Service with a Subject / Facade

1. Notice the `user.service.ts`. It has methods for initiating the user, purging the auth info and exposes the current user state as an observable.
  - This is what some call [Facade](https://medium.com/@thomasburlesonIA/ngrx-facades-better-state-management-82a04b9a1e39) others [Subject service](https://medium.com/@weswhite/angular-behaviorsubject-service-60485ef064fc)
  - Very nice property of this abstraction level is that it's easy to start and feels natural, which is not the case with say NgRx and the whole Redux parade of actions, reducers, selectors, effects, containers and so on...
  - Also when/if project decides to move to a more involved data management solution like Akita or NgXs or NgRx the Service can stay and work with that or beside it with little change required.
  - can serve as a stepping stone to a more powerful state management.
2. For now we'll do nothing but get to know the `user.service.ts` and later we'll try and revisit it

### 25. [NgRx](https://ngrx.io/docs) Setup and replace User service

Keep in mind that importing from `src/app/..` might break the build...

1. Setup. By using the `ng add`, which in turn uses the `Schematics` capabilities we can quickly setup ngrx in our app with minimal manual steps
   - `ng add @ngrx/schematics --defaultCollection false` - add a schematic to assist in creation of new reducers/actions/effects
   - `ng add @ngrx/store --statePath state` - the base of the NgRx Redux implementation - the store, reducer, action etc types and helpers
   - `ng add @ngrx/store-devtools` - instrument for use with the Redux DevTools Extensions http://extension.remotedev.io/
   - `ng add @ngrx/effects` - add the effects part of NgRx - handles side effects like persist etc.
   - IMPORTANT verify installed versions of @ngrx libs are 8.4.0 (or above) in package.json
2. User state (reducer)

   - `ng g @ngrx/schematics:reducer state/user/user -c` - creates the user reducer under state/user folder (we'll keep the state separated by feature rather than by type i.e. state/user and state/articles vs state/reducers/user.reducer.ts and state/reducers/article.ts)
   - in the `user.reducer.ts` file

     - add to the `State` `user: User` and the `initialState` to `{user: User.empty}` (importing the `User` type)

       ```ts
       export interface State {
         user: User;
         loading?: boolean;
       }

       export const initialState: State = {
         user: User.empty
       };
       ```

   - in the `state/index.ts` file import the just created State and reducer and add them to the app's state

     ```ts
     import {
       userFeatureKey,
       State as UserState,
       reducer as userReducer
     } from './user/user.reducer';

     export interface State {
       [userFeatureKey]: UserState;
     }

     export const reducers: ActionReducerMap<State> = {
       [userFeatureKey]: userReducer
     };
     ```

3. User actions
   - `ng g @ngrx/schematics:action state/user/user --api --creators` - create the action file and scaffold the users load action
   - rename `loadUsersFailure` `loadUsersFailure` and `loadUsersFailure` to `loadUserFailure` `loadUserFailure` and `loadUserFailure` - we are loading a single user
   - rename `[User] Load Users` to `[User] Load User` - same reason
     - Why do we need the `[User]` thing?
4. User effects
   - `ng g @ngrx/schematics:effect state/user/user --module app --root` - to create the user effect class and add the it to app root's effects
   - inject `ApiService` and the `JwtService` in the newly created `user.effects.ts`
     ```ts
     constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
     ```
   - implement the `loadUser` effect
     ```ts
     loadUser = createEffect(
       () =>
         this.actions$.pipe(
           ofType('[User] Load User'),
           switchMap(_ => {
             return this.jwt.getToken()
               ? (this.api.get('/user') as Observable<{ user: User }>)
               : of({ user: User.empty });
           }),
           map(d => loadUserSuccess({ data: d.user }))
         ),
       {}
     );
     ```
5. Initiate user loading with starting the app

- inject the `Store` in the `app.module`'s constructor (that's **not** the app.component)
  ```ts
  constructor(store: Store<State>) {
    store.dispatch(loadUser());
  }
  ```
- open the ReduxDevTools console and watch for the emitted events. You should see both `[User] Load User` and `[User] Load User Success`

6. Update the reducer -
   - in `user.reducer.ts` import the actions from `user.actions.ts` i.e. `userLoadSuccess`, etc.
   - then update the reducer
     ```ts
     export const reducer = createReducer(
       initialState,
       // initially set the loading to true
       on(loadUser, state => ({ ...state, loading: true })),
       // when load succeeds - set the user and stop the loading
       on(loadUserSuccess, (state, action) => ({ ...state, user: action.data, loading: false })),
       // on failure - add the error and stop the loading
       on(loadUserFailure, (state, action) => ({
         ...state,
         user: User.empty,
         loading: false,
         error: action.error
       }))
     );
     ```
     - notice how you get type safety in the function implementing the reduction of the state - the action is of the expected type - thanks @ngrx/store
   - open the ReduxDevTools console and now you should see change of the store too
7. Add selectors for user state
   - in `user.reducer.ts` add the following selectors definition
     ```ts
     export const userState = createFeatureSelector<State>(userFeatureKey);
     export const userSelector = createSelector(
       userState,
       s => s.user
     );
     ```
8. Update `Header` component

- in `header.component.ts` inject `Store` in the constructor and select the user:
  ```ts
    currentUser$: Observable<User> = this.store.pipe(select(s => userSelector(s)));
    // no need to provide type for store at this point - up to you
    // would be State<AppStore> where import {State as AppStore} from 'state';
    constructor(private userService: UserService, private store: State<any>) {}
  ```
- in `header.component.template.html` wrap the current user view with a `ng-container` and extract the current user from `currentUser$` i.e. replace lines 63-70 with
  ```html
  <ng-container *ngIf="currentUser$ | async as currentUser">
    <li class="nav-item">
      <a
        class="nav-link"
        [routerLink]="['/profile', currentUser.username]"
        routerLinkActive="active"
      >
        <img [src]="currentUser.image" *ngIf="currentUser.image" class="user-pic" />
        {{ currentUser.username + ' from store' }}
      </a>
    </li>
  </ng-container>
  ``
  ```
- verify user email is still visible

9. Review. See branch [feature/ngrx](https://github.com/gparlakov/angular-realworld-example-app/tree/feature/ngrx) for help or simply checkout
   9.1. What we did - we set up NgRx root using it's schematics. Then created a reducer, some actions, selectors, an effect to handle user load, load success and failure.

### 26. Incorporate User service into NgRx flow

1. We'll retouch the `user.service` and incorporate it in the NgRx flow
2. In `user.actions.ts` add the following action
    ```ts
    export const clearUser = createAction('[User] Clear User');
    ```

    - that will be the signal to remove user from store and tokens from JasonWebToken local storage

3. In `user.effects` change the class to the following
    ```ts
    @Injectable()
    export class UserEffects {
      loadUser = createEffect(
        () =>
          this.actions$.pipe(
            ofType('[User] Load User'),
            switchMap(_ => {
              return this.jwt.getToken()
                ? (this.api
                    .get('/user')
                    // if get user fails - emit the empty user
                    .pipe(catchError((u, e) => of({ user: User.empty }))) as Observable<{
                    user: User;
                  }>)
                : // if no tokens - emit the empty user
                  of({ user: User.empty });
            }),
            map(u =>
              u == null || u.user === User.empty ? clearUser() : loadUserSuccess({ data: u.user })
            )
          ),
        {}
      );

      clearUser = createEffect(
        () =>
          this.actions$.pipe(
            ofType('[User] Clear User'),
            tap(() => this.jwt.destroyToken())
          ),
        { dispatch: false }
      );

      constructor(private actions$: Actions, private api: ApiService, private jwt: JwtService) {}
    }
    ```

    - the `loadUser` effect is extended to emit the `clearUser` action if fetch fails or there are is no token in local storage
    - adding the `clearUser` effect to clear the Jason Web Token from local storage
    - `clearUser` will not emit any more actions so we set `dispatch: false`
4. Update the reducer  `user.reducers`
    - add a reducer fot the `clearUser` action:
        ```ts
        on(clearUser, state => ({...state, user: User.empty}))
        ```
    - that will take care to set the user in store to the Empty User

5. Update the `user.service`
    ```ts
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { select, Store } from '@ngrx/store';
    import { Observable } from 'rxjs';
    import { map } from 'rxjs/operators';
    import { clearUser, loadUser } from '../../state/user/user.actions';
    import { userSelector } from '../../state/user/user.reducer';
    import { User } from '../models';
    import { ApiService } from './api.service';
    import { JwtService } from './jwt.service';


    @Injectable()
    export class UserService {
      public currentUser = this.store.pipe(select(userSelector));

      public isAuthenticated = this.currentUser.pipe(
        map(u => u && u !== User.empty && u.token !== null)
      );
      user: User;

      constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService,
        private store: Store<any>
      ) {}

      // Verify JWT in localstorage with server & load user's info.
      // This runs once on application startup.
      populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
          this.store.dispatch(loadUser());
        } else {
          this.store.dispatch(clearUser());
        }

        this.currentUser.subscribe(u => (this.user = u));
      }

      // kept for backwards compatibility
      purgeAuth() {
        // let the effects handle this
        this.store.dispatch(clearUser());
      }

      attemptAuth(type, credentials): Observable<'success'> {
        const route = type === 'login' ? '/login' : '';
        return this.apiService.post('/users' + route, { user: credentials }).pipe(
          map(
            (): 'success' => {
              this.store.dispatch(loadUser());
              return 'success';
            }
          )
        );
      }

      getCurrentUser(): User {
        return this.user;
      }

      // Update the user on the server (email, pass, etc)
      update(user): Observable<User> {
        return this.apiService.put('/user', { user }).pipe(
          map(data => {
            // Will update the currentUser observable - eventually
            this.store.dispatch(loadUser());
            return data.user;
          })
        );
      }
    }
    ```
    - thus we replace the local state in the `user.service` with the store state
    - and the `side-effects` like API calls and local storage tokens clear is now handled by effects
    - `update` and `attemptAuth` should also be delegated to the effects to keep all effects in one place (left as exercise to the reader)

6. Review. See feature/ngrx-user-service branch for help.

### 27. Test the effects
// TODO 1. The effects runner https://ngrx.io/guide/store/testing https://ngrx.io/guide/effects/testing
// TODO mention e2e tests using exposed store



### N State management

// TODO test suggestion out

All 3 HomeComponent, ProfileArticlesComponent, ProfileFavoritesComponent use the articles filter functionality and separately change the filter of the article.
Home toggles between `Feed`, `Global feed` (i.e. latest) and `Tags` in the filter
ProfileArticlesComponent, ProfileFavoritesComponent toggles between `Own` and `Favorites`.

What could be improved - we could store the state in the ArticlesService and only inform it that an event has happened:
`onYourFeedPageEnter` would trigger the initial loading for that page and keep the result in memory.
`onYourFeedAddAuthor` would renew the cache
`onGlobalFeedEnter` would take the articles
`onGlobalFeedSelectPage` would store the selected page in the filter for that - so that we could come back to the same result
..


# Resources

IntelliJ plugin for snippets https://plugins.jetbrains.com/plugin/8395-angular-2-typescript-live-templates/versions

# NOTES

- FormBuilder - inject vs instantiate
  - it's a case of some logic that is really tightly coupled with the UI logic so it makes sense to instantiate the FormBuilder or the FormGroup itself
  - if we inject it and try to mock it - it is a large API surface area i.e. a lot of mocking would be required
  - injecting the actual FormBuilder in the tests is one option
  - not injecting FormBuilder and instantiating it in the component-under-test is another
- AbstractDate - [FooterComponent](./src/app/shared/layout/footer.component.ts) Demo how to use wrappers around the basic DOM functionalities - Date, setTimeout, requestAnimationFrame etc.
- [Done] AuthGuardService to promise (for promise testing) used another promis
- [Done] add a service LogService - error
- [Done] add a service NotifyService - success/info/error. Actually called `NotificationsService`
- talk about CI - Already doing it? AzureDevOps is great for GitHub integration.
- Pusher - Update key in app.module https://dashboard.pusher.com/apps/858014/keys, https://www.pusher.com/docs/channels/getting_started/javascript (UPDATE KEY)
- Why jump from TestBed to setup?
  - control
  - speed (no need to compile components/for services - unneeded)
  - implementation details in tests! (mockReturnValue(of{})) and if we switch the type of response or need some extra stuff - go and change all tests for that
