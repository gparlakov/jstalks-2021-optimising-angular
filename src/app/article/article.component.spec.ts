import { autoSpy } from 'autoSpy';
import { ArticleComponent } from './article.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, CommentsService, UserService, Article, Comment } from '../core';
import { fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

describe('ArticleComponent', () => {
  it('when populateComments is called and getAll comments promise resolves it should set the comments to the result', fakeAsync(() => {
    // arrange
    const { build } = setup()
      .default()
      .withCommentsResolve([{ id: 1 } as Comment]);
    const c = build();
    c.article = { slug: 'slug' } as Article;
    // act
    c.populateComments();
    tick();
    // assert
    expect(c.comments).toEqual([{ id: 1 }]);
  }));
});

function setup() {
  const route = autoSpy(ActivatedRoute);
  const articlesService = autoSpy(ArticlesService);
  const commentsService = autoSpy(CommentsService);
  const router = autoSpy(Router);
  const userService = autoSpy(UserService);
  const builder = {
    route,
    articlesService,
    commentsService,
    router,
    userService,
    withCommentsResolve(comments: Comment[]) {
      commentsService.getAll.mockReturnValue(Promise.resolve(comments));
      return builder;
    },
    default() {
      return builder;
    },
    build() {
      return new ArticleComponent(route, articlesService, commentsService, router, userService);
    }
  };

  return builder;
}
