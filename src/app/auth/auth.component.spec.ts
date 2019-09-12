import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { autoSpy } from 'autoSpy';
import { ReplaySubject, of } from 'rxjs';
import { UserService, User } from '../core';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  it('when ngOnInit is called and url ends with `login` it should set the auth type and title', () => {
    // arrange
    const { build } = setup().default().withRouteUrl('login');
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c.authType).toEqual('login');
    expect(c.title).toEqual('Sign in');
  });

  it('when ngOnInit is called and url ends with `register` it should set the auth type and title and add one control', () => {
    // arrange
    const { build } = setup().default().withRouteUrl('register');
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c.authType).toEqual('register');
    expect(c.title).toEqual('Sign up');
    expect(c.authForm.get('username')).toBeDefined();
  });

  it('when submitForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.submitForm();
    // assert
    // expect(c).toEqual
  });
});

function setup() {
  const route = autoSpy(ActivatedRoute);
  const url$ = new ReplaySubject<UrlSegment[]>(1);
  route.url = url$;
  const router = autoSpy(Router);
  const userService = autoSpy(UserService);
  const fb = new FormBuilder();
  const builder = {
    route,
    router,
    userService,
    fb,
    withRouteUrl(endsWith: 'login' | 'register') {
      url$.next([new UrlSegment(endsWith, {})]);
      return builder;
    },
    default() {
      builder.withRouteUrl('login');
      userService.attemptAuth.mockReturnValue(of({} as User));
      return builder;
    },
    build() {
      return new AuthComponent(route, router, userService, fb);
    }
  };

  return builder;
}
