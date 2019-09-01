# Task list

## Setup

- fork/clone https://github.com/gparlakov/angular-realworld-example-app
```bash
git clone https://github.com/gparlakov/angular-realworld-example-app
```

- [Optional] [after 1.2] setup jest - ([doc](https://github.com/briebug/jest-schematic#usage-))
```bash
npm i -g @angular/cli @briebug/jest-schematic
ng g @briebug/jest-schematic:add
```
(if you don't want global install on any of those `npx -p @angular/cli@6.2.9 ng add @briebug/jest-schematic`)

## 1. Basic testing
Demo - on the [ListErrorsComponent](./src/app/shared/list-errors.component.ts)
 1. Create a test file for the `./src/app/shared/article-helpers/article-preview.component.ts` - article-preview.component.spec.ts
 2. Construct the component in a test case and verify it actually instantiates successfully
  - no dependencies
  - simple logic
 3. Test the `toggleFavorite` with argument `true`
 4. Test the `toggleFavorite` with argument `false`


#### NOTES
- ~~looks like [article-list-component](./src/app/shared/article-helpers/article-list.component.ts) only keeps the favorites in its memory~~ The buttons components (app-favorite-button and [app-follow-button](./src/app/shared/buttons/follow-button.component.ts#L23)) actually send http requests
- AbstractDate - [FooterComponent](./src/app/shared/layout/footer.component.ts) Demo how to use wrappers around the basic DOM functionalities - Date, setTimeout, requestAnimationFrame etc.
