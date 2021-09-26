import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Article } from './model/article';

@Injectable()
export class ArticleService {
  articles$ = this.http.get<{articles: Article[]}>(`/assets/articles.json`).pipe(
    // response returns an object with articles property -> {articles: Article[]}
    map((r) => r.articles),
    // only make the call 1 time
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}
}
