/// <reference types="pusher-js" />

import { Observable, from } from 'rxjs';

export class PusherService {
  private instance: Pusher.Pusher;
  constructor(private key: string, private config: Pusher.Config) {}

  private init() {
    // System.import('pusher-js').then(p => this.resolve(new p(this.key, this.config)));
  }

  listenForNotifications(userEmail: string): Observable<any> {
    // this.init();

    return from(
      import('pusher-js').then(p => {
        if (this.instance == null) {
          this.instance = new p(this.key, this.config);
        }
        return this.instance;
      })
    );
    // return new Observable<string>(s => {
    //   let channel;
    //   this.instance.then(i => {
    //     channel = i.subscribe(userEmail);
    //     channel.bind('notify', function(data) {
    //       s.next(JSON.stringify(data));
    //     });
    //   });

    //   return () => {
    //     if (channel != null) {
    //       channel.unbind('notify');
    //     }
    //   };
    // });
  }
}
