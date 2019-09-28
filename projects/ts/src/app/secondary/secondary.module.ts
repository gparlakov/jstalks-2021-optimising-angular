import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryRoutingModule } from './secondary-routing.module';
import { SecondaryComponent } from './secondary.component';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [SecondaryComponent],
  imports: [
    CommonModule,
    SecondaryRoutingModule,
    SharedModule
  ]
})
export class SecondaryModule { }
