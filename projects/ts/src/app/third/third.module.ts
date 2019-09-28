import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdRoutingModule } from './third-routing.module';
import { ThirdComponent } from './third.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ThirdComponent],
  imports: [
    CommonModule,
    ThirdRoutingModule,
    SharedModule
  ]
})
export class ThirdModule { }
