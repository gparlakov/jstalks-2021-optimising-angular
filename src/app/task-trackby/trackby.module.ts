import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ArticleService } from './trackby-article.service';
import { TrackByRoutingModule } from './trackby-routing.module';
import { TrackByComponent } from './trackby.component';
// tslint:disable-next-line:max-line-length
import { AdminArticleVisualizeControlComponent } from './components/article-dimensions-control/article-dimensions-control.component';
import { AdminArticleComponent } from './components/article/article.component';
import { AdminArticlesListComponent } from './components/articles-list/articles-list.component';
import { DomIndicatorComponent } from './components/dom-indicator/dom-indicator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrackByComponent,
    AdminArticlesListComponent,
    AdminArticleComponent,
    DomIndicatorComponent,
    AdminArticleVisualizeControlComponent,
  ],
  imports: [CommonModule, TrackByRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [ArticleService]
})
export class TrackByModule {}
