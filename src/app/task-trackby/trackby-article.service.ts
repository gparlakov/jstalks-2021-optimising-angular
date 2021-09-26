import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Article } from './model/article';
import { ArticleDimensionProps, ArticleDimensions } from './model/dimensions';

@Injectable()
export class ArticleService {
  private _articleDimensions$ = new BehaviorSubject<ArticleDimensions>(
    ArticleDimensions.default
  );
  articleDimensions$ = this._articleDimensions$.asObservable();

  _articles$ = this.http.get<{articles: Article[]}>(`/assets/articles.json`).pipe(
    // response returns an object with articles property -> {articles: Article[]}
    map((r) => r.articles),
    // only make the call 1 time
    shareReplay(1)
  );

  articlesWithDimensions$ = combineLatest([
    this._articles$,
    this._articleDimensions$,
  ]).pipe(
    // add the dimensions to the article for the preview
    map(([articles, dims]) =>
      articles.map((a) => ({ ...a, width: dims.width, height: dims.height }))
    )
  );

  constructor(private http: HttpClient) {}

  onArticleDimensionsChange(p: ArticleDimensionProps, v: number) {
    this._articleDimensions$.next(this._articleDimensions$.value.with(p, v));
  }
}
