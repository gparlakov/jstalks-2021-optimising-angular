import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AdminArticleService } from './admin-article.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
// tslint:disable-next-line:max-line-length
import { AdminArticleVisualizeControlComponent } from './components/admin-article-visualize-control/admin-article-visualize-control.component';
import { AdminArticleComponent } from './components/admin-article/admin-article.component';
import { AdminArticlesListComponent } from './components/admin-articles-list/admin-articles-list.component';
import { DomIndicatorComponent } from './components/dom-indicator/dom-indicator.component';
import { SearchComponent } from './components/search/search.component';
import { AdminSearchComponent } from './components/search/admin-search/admin-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    SearchComponent,
    AdminArticlesListComponent,
    AdminArticleComponent,
    DomIndicatorComponent,
    AdminArticleVisualizeControlComponent,
    AdminSearchComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [AdminArticleService]
})
export class AdminModule {}
