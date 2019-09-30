import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminArticle } from './model/admin-article';
import { ApiService } from '../core';

@Injectable()
export class AdminArticleService {
  articles = new BehaviorSubject<AdminArticle[]>([]);
  articles$ = this.articles.asObservable();

  constructor(private apiClient: ApiService) {}

  onAdminEnter() {
    this.apiClient
      .get('/articles?limit=200')
      .toPromise()
      .then(a => this.articles.next(a.articles))
      .catch(e => {
        // this.logger.error(e);
        // this.notification - could not load articles - try searching
      });
  }

  onSearch() {
    // todo implement
  }
}
