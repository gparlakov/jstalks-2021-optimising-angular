import { NgModule, ModuleWithProviders } from '@angular/core';

import { Config } from 'pusher-js';
import { PusherService } from './pusher.service';

@NgModule({})
export class PusherModule {
  static forRoot(key: string, config?: Config): ModuleWithProviders {
    return {
      ngModule: PusherModule,
      providers: [{ provide: PusherService, useFactory: () => new PusherService(key, config) }]
    };
  }
}
