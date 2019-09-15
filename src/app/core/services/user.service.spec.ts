import { autoSpy } from 'autoSpy';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { throwError, of } from 'rxjs';
import { subscribe } from 'src/app/testing/subscribe-in-test';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';

describe('UserService', () => {
  it('when populate called and token in localStorage and user fetch succeeds should emit the user data', () => {
    // arrange
    const { build } = setup()
      .default()
      .withStoredToken('token')
      .withUserResponse({ email: 'success' } as User);
    const c = build();
    const userValues = [];
    c.currentUser
      // user is behavior so it will emit immediately and then again after user data fetched
      .pipe(take(2))
      .subscribe(v => userValues.push(v));
    // act
    c.populate();
    // assert
    expect(userValues).toEqual([{}, { email: 'success' }]); // initially {} then the returned value
  });

  it('when populate called and token in localStorage and user fetch succeeds should emit isAuthenticated', () => {
    // arrange
    const { build } = setup()
      .default()
      .withStoredToken('token')
      .withUserResponse({ email: 'success' } as User);
    const c = build();
    const isAuthenticatedValues = [];
    c.isAuthenticated
      // isAuth is replay subj so it only after .next() called
      .pipe(take(1))
      .subscribe(v => isAuthenticatedValues.push(v));
    // act
    c.populate();
    // assert
    expect(isAuthenticatedValues).toEqual([true]);
  });

  // could replace 4 lines with the help of subscribe-in-test utility
  // it('when populate called and token in localStorage and user fetch succeeds should emit isAuthenticated', () => {
  //   // arrange
  //   const { build } = setup()
  //     .default()
  //     .withStoredToken('token')
  //     .withGetUserResponse({ email: 'success' } as User);
  //   const c = build();
  //   // isAuth is replay subj so it only after .next() called
  //   const isAuthenticatedValues = subscribe(c.isAuthenticated, 1);
  //   // act
  //   c.populate();
  //   // assert
  //   expect(isAuthenticatedValues).toEqual([true]);
  // });

  it('when populate called and empty token in localStorage should emit the empty user and isAuthenticated false', () => {
    // arrange
    const { build } = setup()
      .default()
      .withStoredToken(undefined);
    const c = build();
    const userValues = subscribe(c.currentUser, 2); // user is behavior so it will emit immediately
    const isAuthenticatedValues = subscribe(c.isAuthenticated, 1); // isAuth is replay subj so it only after .next() called
    // act
    c.populate();
    // assert
    expect(isAuthenticatedValues).toEqual([false]);
    expect(userValues).toEqual([{}, {}]); // initially {} then the returned value
  });

  it('when attemptAuth called and POST succeeds should emit "success" and currentUser should also emit', () => {
    // arrange
    const { build } = setup()
      .default()
      .withUserResponse({ email: 'success' } as User, 'POST');
    const c = build();
    const userValues = subscribe(c.currentUser, 2); // user is behavior so it will emit immediately
    // act
    const result = subscribe(c.attemptAuth('login', 'any'));
    // assert
    expect(result).toEqual(['success']);
    expect(userValues).toEqual([{}, { email: 'success' }]); // initially {} then the returned value
  });

  it('when attemptAuth called and POST fails should emit the error and current user should not emit', () => {
    // arrange
    const { build } = setup()
      .default()
      .withUserResponse(new Error('POST failed'), 'POST');
    const c = build();
    const userValues = subscribe(c.currentUser, 2); // user is behavior so it will emit immediately
    // act
    const result = subscribe(c.attemptAuth('login', 'any'));
    // assert
    expect(result).toEqual([{ error: new Error('POST failed') }]);
    expect(userValues).toEqual([{}]); // only the initial {} from beh subject
  });
});

function setup() {
  const apiService = autoSpy(ApiService);
  const http = autoSpy(HttpClient);
  const jwtService = autoSpy(JwtService);
  const builder = {
    apiService,
    http,
    jwtService,
    withUserResponse(v?: User | Error, method: 'GET' | 'POST' = 'GET') {
      const response =
        v instanceof Error || v === undefined ? throwError(v) : of({ user: v || {} });

      if (method === 'GET') {
        apiService.get.mockReturnValue(response);
      } else {
        apiService.post.mockReturnValue(response);
      }
      return builder;
    },
    withStoredToken(t: string | undefined) {
      jwtService.getToken.mockReturnValue(t);
      return builder;
    },
    default() {
      return builder;
    },
    build() {
      return new UserService(apiService, http, jwtService);
    }
  };

  return builder;
}
