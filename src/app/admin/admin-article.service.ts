import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { ApiService } from '../core';
import { AdminArticle } from './model/admin-article';
import { ArticleDimensionProps, ArticleDimensions } from './model/admin-article-dimensions';

@Injectable()
export class AdminArticleService {
  private fetchArticlesSubject = new Subject();
  private articles = new BehaviorSubject<AdminArticle[]>([]);
  articles$ = this.articles.asObservable();

  private articleConfig = new BehaviorSubject<ArticleDimensions>(ArticleDimensions.default);
  articleConfig$ = this.articleConfig.asObservable();

  constructor(private apiClient: ApiService) {}

  onAdminEnter() {
    combineLatest([this.fetchArticles(100), this.articleConfig])
      .pipe(
        map(([articles, config]) =>
          articles.map(a => ({ ...a, width: config.width, height: config.height }))
        )
      )
      .subscribe(
        articles => this.articles.next(articles),
        _e => {
          // this.logger.error(e);
          // this.notification - could not load articles - try searching
        }
      );
  }

  private fetchArticles(count: number, skip?: number): Observable<AdminArticle[]> {
    skip = skip || 0;
    return (
      this.apiClient
        .get(`/articles?limit=${count}&skip=${skip}`)
        // response returns an object with articles property -> {articles: Article[]}
        .pipe(map(r => r.articles))
    );
  }

  onSearch() {
    // todo implement
  }

  onArticleChange(p: ArticleDimensionProps, v: number) {
    this.articleConfig.next(this.articleConfig.value.with(p, v));
  }
}
