import { Component, OnInit } from '@angular/core';
import { ArticleService } from './trackby-article.service';
import { Article } from './model/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './trackby.component.html',
  styleUrls: ['./trackby.component.css']
})
export class TrackByComponent implements OnInit {
  articles$: Observable<Article[]>;
  constructor(private articlesService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.articlesService.articlesWithDimensions$;
  }
}
