import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PageOnPushComponent } from './components/page-on-push/page-on-push.component';
import { PageDebounceComponent } from './components/page-debounce/page-debounce.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'on-push', component: PageOnPushComponent },
  { path: 'debounce', component: PageDebounceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
