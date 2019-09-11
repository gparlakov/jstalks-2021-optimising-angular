import { autoSpy } from 'autoSpy';
import { ProfileResolver } from './profile-resolver.service';
import { ProfilesService } from '../core';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

describe('ProfileResolver', () => {
  it('when resolve is called it should call the profileService with the route param', () => {
    // arrange
    const { build, profilesService } = setup().default();
    const c = build();
    // act
    c.resolve({ params: { username: 'test' } } as any, null);
    // assert
    expect(profilesService.get).toHaveBeenCalledWith('test');
  });

  it('when resolve is called and the profileService.get rejects should call router.navigate("/")', async(() => {
    // arrange
    const { build, router } = setup()
      .default()
      .withProfileGetRejects('error');
    const c = build();
    // act
    c.resolve({ params: { username: 'test' } } as any, null).then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  }));
});

function setup() {
  const profilesService = autoSpy(ProfilesService);
  const router = autoSpy(Router);
  const builder = {
    profilesService,
    router,
    default() {
      profilesService.get.mockResolvedValue({} as any);
      return builder;
    },
    withProfileGetRejects(e: any) {
      profilesService.get.mockRejectedValue(e);
      return builder;
    },
    build() {
      return new ProfileResolver(profilesService, router);
    }
  };

  return builder;
}
