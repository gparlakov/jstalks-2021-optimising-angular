# Optimising Angular

## TODO

- upgrade to latest angular
- use the angular dev tools to demo check
- Window:mousein
- do a test run


## Performance

- on the Component level (low performance)
- on the Module level (slow loading)

Page - what the user sees as a page (could be one or more components)

## Low performance

### Angular performance - trackBy

1. Notice the /admin route of the app. Interact with the controls on the left (width, height, by) and notice the updating count of all components. That's because we keep changing the referenced objects filtered and updated by the [admin-article.service](src/app/admin/admin-article.service.ts#l23) with the input provided in the admin-article-visualize-control.component (i.e. the aforementioned controls - width, height, by).
2. Add a `articleSlug` property in the `admin-article-list.component`
3. Let it be of type `TrackByFunction<AdminArticle>`
4. Assign a function to the property that accepts index and an item if type `AdminArticle` and return the slug of the article.
5. Now notice the template of `admin-article-list.component`.
6. Add a `;trackBy=articleSlug` to the end of the `*ngFor` declaration. That will instruct Angular to take the returned value and check that for equality with the previous one instead of just comparing object references.
7. Notice how the controls no longer cause the redrawing of the whole list and rather make the existing components change.
8. Review (for help see [component](files/src/app/admin/admin-article-list/admin-articles-list.component.ts.help) and [template](files/src/app/admin/admin-article-list/admin-articles-list.component.html.help))

### Angular performance - OnPush

1. Notice the `/admin/on-push` route. See how writing in the input triggers change detection in all of the `admin-article.component`-s with no visible changes.
2. This happens because the ngFor difference strategy relies on object reference comparison and since `admin-article.service` emits a new object every time, Angular has to destroy the component and create a new one for the new object reference. We **`can`** affect that by the `trackBy` input of the ngFor structural directive
3. Adjust the change detection strategy of the `admin-article.component` to on-push.
4. Try typing in the input again and notice if the change detection is triggered in the article
5. Review (for help see [admin-article.component.ts.help](files/src/app/admin/admin-article/admin-article.component.ts.help))

### Angular performance - debounce

1. Notice the `/admin/debounce` route.

2. The `admin-search.component` initializes the search by providing the changes observable. Then the `admin-article.service` will construct the (mock) request out of each emission of that observable.
3. The effect is manifested by typing in the search resulting in a **request** for **each** typed character
4. Apply the `debounceTime` operator in the `admin-search.component` (ex `debounceTime(400)`)
5. Notice that the request waits for you to finish writing before sending the request (mock request)
6. Review (for help see [component](files/src/app/admin/admin-search/admin-search.component.ts.help))

## More slow loading

## Slow loading

### Bundle size

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
   - using nvm (node version manger)
     - install nvm ([linux/MacOs](https://github.com/nvm-sh/nvm)) ([windows](https://github.com/coreybutler/nvm-windows))
     - run `nvm install 10.13.0`
     - run `nvm use 10.13.0`
     - run the scripts
       - `ng update @angular/cli @angular/core`
       - `ng build ts --prod --common-chunk false --stats-json` (notice we build `ts` app))
       - `webpack-bundle-analyzer dist/ts/stats-es2015.json`

### Lazy loading

1. Make Article module lazy
   - remove ArticleModule from AppModule
   - make the route use `loadChildren: "./article/article.module#ArticleModule"`
2. Make Settings module lazy - same steps as above
3. Note the bundles sizes change (run steps 2. and 3.)
   `ng build --prod --stats-json && webpack-bundle-analyzer dist/stats.json`
4. Review (see [app-routing.module.ts](files/src/app/app-routing.module.ts.help) and [app.module.ts](files/src/app/app.module.ts.help))

### Removal of unused modules manually

1. Check out the moment locales (keep the browser tab open for comparison)
2. Add `"postinstall": "node ./tools/remove-unused-locales.js"` to `scripts` section of package.json
3. Run `npm i` to invoke the post install hook script
4. `ng build --prod --stats-json` and `webpack-bundle-analyzer ./dist/stats.json` and `` and see the bundle size differ
5. Review
   // Demonstrate how to remove the moment js (or any other) locales not in use

### Manual JS lazy module load

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
