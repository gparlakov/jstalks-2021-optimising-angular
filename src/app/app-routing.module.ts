import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './core';
import { ArticleComponent } from './article/article.component';
import { ArticleResolver } from './article/article-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    // canActivate: [AdminGuard] - as an exercise for the reader
  },
  {
    path: 'trackby',
    loadChildren: './task-trackby/trackby.module#TrackByModule'
  },
  {
    path: 'onpush',
    loadChildren: './task-onpush/onpush.module#OnPushModule'
  },
  {
    path: 'debounce',
    loadChildren: './task-debounce/debounce.module#DebounceModule'
  },
  {
    path: 'listener',
    loadChildren: './task-listener/listener.module#ListenerModule'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
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
