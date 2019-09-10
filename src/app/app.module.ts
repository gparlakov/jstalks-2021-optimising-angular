import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { UserService } from './core';
import { NotificationsService } from './core/services/notifications.service';

import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PusherService } from './core/services/pusher.service';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, CoreModule, SharedModule, HomeModule, AuthModule, AppRoutingModule],
  providers: [
    {
      provide: 'pusher',
      useFactory: (userService: UserService, notifications: NotificationsService, pusher: PusherService) => {
        userService.currentUser
          .pipe(switchMap(u => (u != null && u.email != null ? pusher.listenForNotifications(u.email) : EMPTY)))
          .subscribe(u => {
            notifications.success(u);
          });
      },
      deps: [UserService, NotificationsService, PusherService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
