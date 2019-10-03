import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminArticleService } from './admin-article.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminArticleComponent } from './components/admin-article/admin-article.component';
import { AdminArticlesListComponent } from './components/admin-articles-list/admin-articles-list.component';
import { DomIndicatorComponent } from './components/dom-indicator/dom-indicator.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    AdminComponent,
    SearchComponent,
    AdminArticlesListComponent,
    AdminArticleComponent,
    DomIndicatorComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  providers: [AdminArticleService]
})
export class AdminModule {}
