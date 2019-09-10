import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  ArticlesService,
  AuthGuard,
  CommentsService,
  JwtService,
  ProfilesService,
  TagsService,
  UserService
} from './services';
import { PusherService } from './services/pusher.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    PusherService
  ],
  declarations: []
})
export class CoreModule { }
