/// <reference types="pusher-js" />

import { Observable } from 'rxjs';
import Pusher, { Channel, Options } from 'pusher-js';

export class PusherService {
  private instance: Pusher;

  constructor(private key: string, private config: Options) {}

  listenForNotifications(email: string): Observable<string> {
    // create a new observable and have the receiving party handle subscribe and use logic and then unsubscribe
    return new Observable(s => {
      let userChannel: Channel;

      this.getPusherInstance().then(i => {
        userChannel = i.subscribe(email);
        userChannel.bind('notify', function(data) {
          s.next(JSON.stringify(data));
        });
      });

      // clean up the binding
      return () => {
        userChannel.unbind('notify');
      };
    });
  }

  private getPusherInstance() {
    if (this.instance == null) {
      this.instance = new Pusher(this.key, this.config);
    }
    return Promise.resolve(this.instance);
  }
}
