import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService, User } from './core';
import { NotificationsService } from './core/services/notifications.service';
import { PusherService } from './core/services/pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // for the bonus task add dependency -> private pusher: PusherService
  constructor(private userService: UserService, private notifications: NotificationsService) {}

  ngOnInit() {
    this.userService.populate();
    this.notifications.success('Welcome!');

    // bonus - uncomment and add a test case
    // this.listenForPushNotifications(this.userService.currentUser, this.pusher, this.notifications);
  }

  listenForPushNotifications(
    currentUser: Observable<User>,
    pusher: PusherService,
    notifications: NotificationsService
  ) {
    // currentUser
    //   .pipe(
    //     switchMap(u =>
    //       u != null && u.email != null ? pusher.listenForNotifications(u.email) : EMPTY
    //     )
    //   )
    //   .subscribe(u => {
    //     notifications.success(u);
    //   });
  }
}
