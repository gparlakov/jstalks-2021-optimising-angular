FROM node:10
WORKDIR /app
RUN git clone https://github.com/gparlakov/angular-realworld-example-app/ /app
RUN npm i
RUN npx ng update @angular/cli @angular/core
RUN npm i -g webpack-bundle-analyzer
RUN npx ng build ts --prod --common-chunk false --stats-json
CMD webpack-bundle-analyzer dist/ts/stats-es2015.json --host 0.0.0.0
