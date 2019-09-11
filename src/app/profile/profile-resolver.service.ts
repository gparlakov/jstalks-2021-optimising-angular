import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Profile, ProfilesService } from '../core';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profilesService: ProfilesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Promise<any> {
    return this.profilesService
      .get(route.params['username'])
      .catch(_err => this.router.navigateByUrl('/'));
  }
}
