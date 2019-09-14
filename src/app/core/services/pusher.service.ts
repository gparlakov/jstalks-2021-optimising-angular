import * as pusherConstructor from 'pusher-js';
import { Pusher } from 'pusher-js';
import { Observable } from 'rxjs';

export class PusherService {
  private instance: Pusher;
  constructor(key: string, config: pusherConstructor.Config) {
    this.instance = new pusherConstructor(key, config);
  }

  listenForNotifications(userEmail: string): Observable<string> {
    return new Observable<string>(s => {
      const channel = this.instance.subscribe(userEmail);
      channel.bind('notify', function(data) {
        s.next(JSON.stringify(data));
      });

      return () => {
        channel.unbind('notify');
      };
    });
  }
}
