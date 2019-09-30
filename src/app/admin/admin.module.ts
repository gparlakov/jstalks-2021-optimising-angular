import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SearchComponent } from './components/search/search.component';
import { AdminArticlesListComponent } from './components/admin-articles-list/admin-articles-list.component';
import { AdminArticleComponent } from './components/admin-article/admin-article.component';
@NgModule({
  declarations: [
    AdminComponent,
    SearchComponent,
    AdminArticlesListComponent,
    AdminArticleComponent
  ],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
