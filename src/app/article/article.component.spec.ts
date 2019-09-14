import { autoSpy, SpyOf } from 'autoSpy';
import { ArticleComponent } from './article.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, CommentsService, UserService, Article, Comment } from '../core';
import { fakeAsync, flushMicrotasks } from '@angular/core/testing';

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
    flushMicrotasks();
    // assert
    expect(c.comments).toEqual([{ id: 1 }]);
  }));

  // tslint:disable-next-line:max-line-length
  it('when addComments is called and add comments promise resolves it should add the comment to local comments', fakeAsync(() => {
    // arrange
    const { build } = setup()
      .default()
      .withCommentsResponse('add', ({ data: 'scom' } as unknown) as Comment);
    const c = build();
    c.article = { slug: 'slug' } as Article;
    c.comments = [];
    // act
    c.addComment();
    flushMicrotasks();
    // assert
    expect(c.comments).toEqual([{ data: 'scom' }]);
  }));

  // tslint:disable-next-line:max-line-length
  it('when addComments is called and add comments promise rejects it should set the errors with the rejection error', fakeAsync(() => {
    // arrange
    const { build } = setup()
      .default()
      .withCommentsResponse('add', new Error('test'));
    const c = build();
    c.article = { slug: 'slug' } as Article;
    // act
    c.addComment();
    flushMicrotasks();
    // assert
    expect(c.commentFormErrors).toEqual(new Error('test'));
  }));

  // tslint:disable-next-line:max-line-length
  it('when onDeleteComment is called and destroy comments promise resolves it should remove the comment from local comments', fakeAsync(() => {
    // arrange
    const { build } = setup()
      .default()
      .withCommentsResponse('destroy', {});
    const c = build();
    c.article = { slug: 'slug' } as Article;
    const commentToDelete = { id: 1, body: '', createdAt: '', author: {} as any };
    c.comments = [commentToDelete];
    // act
    c.onDeleteComment(commentToDelete);
    flushMicrotasks();
    // assert
    expect(c.comments).toEqual([]);
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

    // prettier-ignore
    // tslint:disable-next-line:max-line-length
    withCommentsResponse<M extends keyof CommentsService, R extends SpyOf<CommentsService>[M] extends (...args: any[]) => Promise<infer Res> ? Res : Error>(method: M, methodType: R | Error) {

      const m: jest.SpyInstance = commentsService[method];
      if (methodType instanceof Error) {
        m.mockReturnValueOnce(Promise.reject(methodType));
      } else {
        m.mockReturnValue(Promise.resolve(methodType));
      }
      return builder;
    },
    withCommentsResolve(comments: Comment[]) {
      commentsService.getAll.mockReturnValue(Promise.resolve(comments));
      return builder;
    },
    withCommentsRejects(e?: Error) {
      commentsService.getAll.mockReturnValueOnce(Promise.reject(e));
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
