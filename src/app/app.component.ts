import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService, User } from './core';
import { NotificationsService } from './core/services/notifications.service';
import { PusherService } from './core/services/pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  notificationsButtonVisible = true;

  constructor(
    private userService: UserService,
    private notifications: NotificationsService,
    // for the bonus task add dependency -> private pusher: PusherService
    private pusher: PusherService
  ) {}

  ngOnInit() {
    this.userService.populate();
    this.notifications.success('Welcome!');
  }

  onUserWantsNotificationsButtonClick() {
    // bonus - uncomment and add a test case
    this.listenForPushNotifications(this.userService.currentUser, this.pusher, this.notifications);
    this.notificationsButtonVisible = false;
  }

  listenForPushNotifications(
    currentUser: Observable<User>,
    pusher: PusherService,
    notifications: NotificationsService,
    retries: number = 0
  ) {
    currentUser
      .pipe(
        // switch map would unsubscribe to the previous observable thereby doing the cleanup logic (i.e. channel unbind)
        switchMap(u =>
          u != null && u.email != null ? pusher.listenForNotifications(u.email) : EMPTY
        )
      )
      .subscribe(
        u => {
          notifications.success(u);
        },
        e => {
          // this.logger.error(e);
          // notify user push notifications are now over!
        },
        () => {
          // the complete logic - retry the whole thing. ex:
          if (retries < 3) {
            retries += 1;
            this.listenForPushNotifications(currentUser, pusher, notifications, retries);
          }
        }
      );
  }
}
