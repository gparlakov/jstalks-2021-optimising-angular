import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

// import { Config } from 'pusher-js';
import { PusherService } from './pusher.service';

export const pusherKey = new InjectionToken('pusher_key');
export const pusherConfig = new InjectionToken('pusher_config');

export function pusherFactory(key: string, config: any) {
  return new PusherService(key);
}

@NgModule({
  providers: []
})
export class PusherModule {
  static forRoot(key: string, config?: any): ModuleWithProviders<PusherModule> {
    return {
      ngModule: PusherModule,
      providers: [
        {
          provide: PusherService,
          useFactory: pusherFactory,
          deps: [pusherKey, pusherConfig]
        },
        { provide: pusherKey, useValue: key },
        { provide: pusherConfig, useValue: config }
      ]
    };
  }
}

