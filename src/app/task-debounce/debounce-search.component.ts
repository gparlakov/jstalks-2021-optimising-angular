import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DebounceArticleService } from './debounce-article.service';

@Component({
  selector: 'app-debounce-search',
  templateUrl: './debounce-search.component.html',
  styleUrls: ['./debounce-search.component.css']
})
export class DebounceSearchComponent implements OnInit {
  searchControl = new FormControl('hack');
  articles = this.articlesService.articlesFromSearch$;
  articleSearchRequests$ = this.articlesService.articleSearchRequests$;

  constructor(private articlesService: DebounceArticleService) {}

  ngOnInit() {
    this.articlesService.onSearchInit(this.searchControl.valueChanges);
  }
}
