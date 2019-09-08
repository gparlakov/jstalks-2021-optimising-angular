import { Injectable } from '@angular/core';
import { Pusher } from 'pusher-js';
import { Observable } from 'rxjs';

@Injectable()
export class PusherService {
  private state: 'new' | 'initializing' | 'ready' = 'new';

  private resolve: (value?: Pusher) => void;
  private instance = new Promise<Pusher>(res => {
    this.resolve = res;
  });

  private initialize() {
    if (this.state === 'new') {
      this.state = 'initializing';
      import('pusher-js/dist/web/pusher').then((p: Pusher) => {
        // Enable pusher logging - don't include this in production
        p.logToConsole = true;

        const pusher = new p('9f8f05d0ef12f10ded99', {
          cluster: 'eu',
          forceTLS: true
        });

        this.resolve(pusher);
      });
    } else if (this.state === 'initializing') {
    } else {
      // we are ready = no need to do anything
    }
    return this.instance;
  }

  listenForNotifications(userId: string): Promise<Observable<string>> {
    return this.initialize().then(p => {
      return new Observable<string>(s => {
        const channel = p.subscribe(userId);
        channel.bind('notify', function(data) {
          s.next(JSON.stringify(data));
        });
        return () => {
          channel.unbind('notify');
        };
      });
    });
  }
}
