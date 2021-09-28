FROM node:14
WORKDIR /app
# get the code
RUN git clone https://github.com/gparlakov/hack-conf-optimising-angular/ /app

# deps
RUN npm i
RUN npm uninstall codelyzer
RUN npm i webpack-bundle-analyzer tslint typescript@4.3 node-notifier @swc/core @angular/localize @angular/service-worker @swc/wasm karma ng-packagr tailwindcss tslib@^2.1.0 autoprefixer@^10.0.2 @babel/core@^7.12.0 postcss@^8.2.15 acorn@^8 tailwindcss @schematics/update
RUN npm i @schematics/update
RUN npx ng update @angular/cli

# # bundle for analysis
RUN npx ng build ts --prod --common-chunk false --stats-json

# # webpack-bundle-analyzer port
EXPOSE 8888

# # app ports
EXPOSE 4200
EXPOSE 4201

CMD npx webpack-bundle-analyzer dist/ts/stats-es2015.json --host 0.0.0.0
