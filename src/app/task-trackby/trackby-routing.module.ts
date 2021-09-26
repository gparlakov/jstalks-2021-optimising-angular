import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackByComponent } from './trackby.component';

const routes: Routes = [
  { path: '', component: TrackByComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackByRoutingModule {}
