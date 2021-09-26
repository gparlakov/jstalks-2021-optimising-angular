import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DebounceArticleService } from './debounce-article.service';
import { DebounceRoutingModule } from './debounce-routing.module';
import { DebounceSearchComponent } from './debounce-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DebounceSearchComponent,
  ],
  imports: [CommonModule, DebounceRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [DebounceArticleService]
})
export class DebounceModule {}
