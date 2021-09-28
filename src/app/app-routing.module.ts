import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './core';
import { ArticleComponent } from './article/article.component';
import { ArticleResolver } from './article/article-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // canActivate: [AdminGuard] - as an exercise for the reader
  },
  {
    path: 'trackby',
    loadChildren: () => import('./task-trackby/trackby.module').then(m => m.TrackByModule)
  },
  {
    path: 'onpush',
    loadChildren: () => import('./task-onpush/onpush.module').then(m => m.OnPushModule)
  },
  {
    path: 'debounce',
    loadChildren: () => import('./task-debounce/debounce.module').then(m => m.DebounceModule)
  },
  {
    path: 'listener',
    loadChildren: () => import('./task-listener/listener.module').then(m => m.ListenerModule)
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule),
  },
  {
    path: 'article',
    children: [
      {
        path: ':slug',
        component: ArticleComponent,
        resolve: {
          article: ArticleResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all modules; optionally we could
      // implement a custom preloading strategy for just some
      // of the modules (PRs welcome 😉)
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
