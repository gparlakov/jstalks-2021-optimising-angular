import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ArticleService } from './listener-article.service';
import { ListenerRoutingModule } from './listener-routing.module';
import { ListenerComponent } from './listener.component';
// tslint:disable-next-line:max-line-length
import { AdminArticleVisualizeControlComponent } from './components/article-dimensions-control/article-dimensions-control.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminArticlesListComponent } from './components/articles-list/articles-list.component';
import { DomIndicatorComponent } from './components/dom-indicator/dom-indicator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListenerComponent,
    AdminArticlesListComponent,
    ArticleComponent,
    DomIndicatorComponent,
    AdminArticleVisualizeControlComponent,
  ],
  imports: [CommonModule, ListenerRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [ArticleService]
})
export class ListenerModule {}
