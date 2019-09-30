import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SearchComponent } from './components/search/search.component';
import { AdminArticlesListComponent } from './components/admin-articles-list/admin-articles-list.component';
import { AdminArticleComponent } from './components/admin-article/admin-article.component';
import { AdminArticleService } from './admin-article.service';
import { DomIndicatorComponent } from './components/dom-indicator/dom-indicator.component';
@NgModule({
  declarations: [
    AdminComponent,
    SearchComponent,
    AdminArticlesListComponent,
    AdminArticleComponent,
    DomIndicatorComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
  providers: [AdminArticleService]
})
export class AdminModule {}
