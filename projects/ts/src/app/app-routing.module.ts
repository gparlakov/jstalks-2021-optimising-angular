import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'secondary',
    loadChildren: () => import('./secondary/secondary.module').then(s => s.SecondaryModule)
  },
  {
    path: 'third',
    loadChildren: () => import('./third/third.module').then(r => r.ThirdModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
