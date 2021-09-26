import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, map, mergeMap, scan, startWith } from 'rxjs/operators';
import { ApiService } from '../core';
import { Article as Article } from './model/article';

@Injectable()
export class DebounceArticleService {
  private searchInput$ = new ReplaySubject<Observable<string>>(1);
  private search$ = this.searchInput$.pipe(
    mergeMap(s => s),
    startWith('cy')
  );

  articlesFromSearch$ = combineLatest([this.search$, this.fetchArticles(100)]).pipe(
    map(([s, as]) =>
      as.filter(
        a =>
          a.body.toLowerCase().includes(s.toLowerCase()) ||
          a.title.toLowerCase().includes(s.toLowerCase())
      )
    )
  );
  articleSearchRequests$ = this.search$.pipe(scan((acc, _) => acc += 1, 0));

  constructor(private apiClient: ApiService) {}

  private fetchArticles(count: number, skip?: number): Observable<Article[]> {
    skip = skip || 0;
    return (
      this.apiClient
        .get(`/articles?limit=${count}&skip=${skip}`)
        // response returns an object with articles property -> {articles: Article[]}
        .pipe(map(r => r.articles))
    );
  }

  onSearchInit(searchInput$: Observable<string>) {
    this.searchInput$.next(searchInput$);
  }
}
