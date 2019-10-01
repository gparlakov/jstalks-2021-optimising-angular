import { Injectable } from '@angular/core';
import { BehaviorSubject, merge } from 'rxjs';
import { AdminArticle } from './model/admin-article';
import { ApiService } from '../core';
import { scan, take } from 'rxjs/operators';
import { AdminArticleComponentService, ArticleComponentConfig, Props as ArticleConfigProps } from "./model/Props";

@Injectable()
export class AdminArticleService implements AdminArticleComponentService {
  articles = new BehaviorSubject<AdminArticle[]>([]);
  articles$ = this.articles.asObservable();

  articleConfig = new BehaviorSubject<ArticleComponentConfig>(ArticleComponentConfig.default);
  articleConfig$ = this.articleConfig.asObservable();

  constructor(private apiClient: ApiService) {}

  onAdminEnter() {
    merge(
      this.fetchArticles(100, 0),
      this.fetchArticles(100, 100),
      this.fetchArticles(100, 200),
      this.fetchArticles(100, 300),
      this.fetchArticles(100, 400)
    )
      .pipe(
        take(5),
        scan((acc, next) => [...acc, ...next.articles], [] as AdminArticle[])
      )
      .subscribe(
        articles => this.articles.next(articles),
        _e => {
          // this.logger.error(e);
          // this.notification - could not load articles - try searching
        }
      );
  }

  private fetchArticles(count: number, skip?: number) {
    skip = skip || 0;
    return this.apiClient.get(`/articles?limit=${count}&skip=${skip}`);
  }

  onSearch() {
    // todo implement
  }

  onArticleChange(p: ArticleConfigProps, v: ArticleComponentConfig[ArticleConfigProps]) {
    this.articleConfig.next(this.articleConfig.value.with(p, v));
  }
}
