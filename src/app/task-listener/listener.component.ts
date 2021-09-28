import { Component, OnInit } from '@angular/core';
import { ArticleService } from './listener-article.service';
import { Article } from './model/article';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {
  articles$: Observable<Article[]>;
  constructor(private articlesService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.articlesService.articlesWithDimensions$;
  }
}
