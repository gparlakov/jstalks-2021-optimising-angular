import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>Welcome to {{ title }}!</h1>
      <h3>To see the tree shaker in action do</h3>
      <p><code>ng build ts --prod --stats-json && webpack-bundle-analyzer dist/ts/stats.json</code></p>
      <p><code>ng build ts --prod --common-chunk false --stats-json && webpack-bundle-analyzer dist/ts/stats.json</code></p>
    </div>
    <ul>
      <li>
        <img
          width="20"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
        />
      </li>
      <li>
        <a [routerLink]="'main'">Main</a>
      </li>
      <li>
        <a [routerLink]="'secondary'">Secondary</a>
      </li>
      <li>
        <a [routerLink]="'third'">Third</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      ul {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
      }
    `,
    `
      ul li {
        display: inline;
        list-style-type: none;
        padding-right: 5px;
      }
    `
  ]
})
export class AppComponent {
  title = 'Tree shake demo';
}
