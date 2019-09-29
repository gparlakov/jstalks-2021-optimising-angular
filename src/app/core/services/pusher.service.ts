/// <reference types="pusher-js" />

import { Inject, InjectionToken, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

const receiveNotificationsKey = 'user_receive_notifications';
export const LocalStorageToken = new InjectionToken('Local Storage Token');

// TODO finish the two steps - onINit start listening for notifications and on stop stop
// or just have start listening which returns an observable and handle all else on the spot
export class PusherService {
  private instance: Pusher.Pusher;
  private subscription = new Subscription();
  private channel: Pusher.Channel;

  constructor(
    private key: string,
    private config: Pusher.Config,
    @Inject(LocalStorageToken) private storage: Storage,
    private notificationsService: NotificationsService,
    private user: UserService
  ) {}

  onInit(): void {
    this.initPusher(this.storage.getItem(receiveNotificationsKey) as 'on' | 'off');
  }

  onUserWantsToReceivePushNotificationsToggle(to: 'on' | 'off') {
    this.storage.setItem(receiveNotificationsKey, to);
    this.initPusher(to);
  }

  private initPusher(to?: 'on' | 'off') {
    import('pusher-js')
      .then(p => {
        if (this.instance == null) {
          this.instance = new p(this.key, this.config);
        }
        return this.instance;
      })
      .then(i => {
        const s = this.user.currentUser
          .pipe(
            map(u => {
              if (u && u.email != null) {
                this.channel = i.subscribe(u.email);
                this.channel.bind('notify', function(data) {
                  this.notificationsService.success(JSON.stringify(data));
                });
              } else {
                this.channel.unbind_all();
                i.unsubscribe(u.email);
              }
            })
          )
          .subscribe();

        // to be able to unsubscribe
        this.subscription.add(s);
      });
  }
}
