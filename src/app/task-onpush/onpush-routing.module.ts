import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageOnPushComponent } from './components/page-on-push/page-on-push.component';

const routes: Routes = [
  { path: '', component: PageOnPushComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
