import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListenerComponent } from './listener.component';

const routes: Routes = [
  { path: '', component: ListenerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListenerRoutingModule {}
