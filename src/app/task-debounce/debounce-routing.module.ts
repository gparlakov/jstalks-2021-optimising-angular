import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebounceSearchComponent } from './debounce-search.component';

const routes: Routes = [
  { path: '', component: DebounceSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebounceRoutingModule {}
