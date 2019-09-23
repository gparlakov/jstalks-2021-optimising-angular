/// <reference types="cypress" />

declare interface User {
  email: string;
  username: string;
  token: string;
  password: string;
}

declare interface Author {
  username: string;
  bio: string;
  image: string;
  following: false;
}
declare interface Article {
  author: Author;
  body: string;
  createdAt: Date;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: Date;
}

declare namespace Cypress {
  interface Chainable<Subject> {
    register(): Chainable<User>;
    login(u: { email: string; password: string }): Chainable<User>;
  }
}
