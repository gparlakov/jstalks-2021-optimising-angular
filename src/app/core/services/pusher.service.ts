import { Injectable } from '@angular/core';
import * as pusherConstructor from 'pusher-js';
import { Pusher } from 'pusher-js';
import { Observable } from 'rxjs';

// make the pusher instance global
let instance: Pusher;
@Injectable()
export class PusherService {
  private getInstance() {
    if (instance == null) {
      instance = new pusherConstructor('bab3acb87e71b32c150b', {
        cluster: 'eu',
        forceTLS: true
      });
    }
    return instance;
  }

  listenForNotifications(userEmail: string): Observable<string> {
    return new Observable<string>(s => {
      const p1 = this.getInstance();
      const channel = p1.subscribe(userEmail);
      channel.bind('notify', function(data) {
        s.next(JSON.stringify(data));
      });

      return () => {
        channel.unbind('notify');
      };
    });
  }
}
