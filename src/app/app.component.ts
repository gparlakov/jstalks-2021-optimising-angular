import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService, User } from './core';
import { NotificationsService } from './core/services/notifications.service';
import { PusherService } from './core/services/pusher.service';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  notificationsButtonVisible = true;
  time = moment().format('H:mm:ss');

  constructor(
    private userService: UserService,
    private notifications: NotificationsService,
    private router: Router,
    private pusher: PusherService
  ) {}

  ngOnInit() {
    this.userService.populate();
    this.notifications.success('Welcome!');

    // uncomment to see router events
    // this.router.events.subscribe(e => console.log(e));
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
