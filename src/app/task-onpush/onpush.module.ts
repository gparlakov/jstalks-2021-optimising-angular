import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './onpush-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageOnPushComponent } from './components/page-on-push/page-on-push.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleService } from './onpush-article.service';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [PageOnPushComponent, ArticleComponent, ArticlesListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [ArticleService],
})
export class OnPushModule {}
