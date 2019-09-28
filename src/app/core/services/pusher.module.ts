import { NgModule, ModuleWithProviders } from '@angular/core';

import { Config } from 'pusher-js';
import { PusherService } from './pusher.service';

@NgModule({})
export class PusherModule {
  static forRoot(key: string, config?: Config): ModuleWithProviders {
    const pusherKey = 'pusher_key';
    const pusherConfig = 'pusher_config';
    return {
      ngModule: PusherModule,
      providers: [
        { provide: pusherKey, useValue: key },
        { provide: pusherConfig, useValue: config },
        { provide: PusherService, useFactory: pusherFactory, deps: [pusherKey, pusherConfig] }
      ]
    };
  }
}

export function pusherFactory(key: string, config: Config) {
  return new PusherService(key, config);
}
