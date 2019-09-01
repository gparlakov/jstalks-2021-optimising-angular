# Task list

## Setup

- fork/clone https://github.com/gparlakov/angular-realworld-example-app
```bash
git clone https://github.com/gparlakov/angular-realworld-example-app
```

- [Optional] [after 1.2] setup jest - `npx

## 1. Basic testing
 1. Create a test file for the `./src/app/shared/article-helpers/article-preview.component.ts` - article-preview.component.spec.ts
 2. Construct the component in a test case and verify it actually instantiates successfully
  - no dependencies
  - simple logic



#### NOTES
- ~~looks like [article-list-component](./src/app/shared/article-helpers/article-list.component.ts) only keeps the favorites in its memory~~ The buttons components (app-favorite-button and [app-follow-button](./src/app/shared/buttons/follow-button.component.ts#L23)) actually send http requests
