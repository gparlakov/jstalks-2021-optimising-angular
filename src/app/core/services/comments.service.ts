import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentsService {
  constructor(private apiService: ApiService) {}

  add(slug, payload): Promise<Comment> {
    return this.apiService
      .post(`/articles/${slug}/comments`, { comment: { body: payload } })
      .pipe(map(data => data.comment))
      .toPromise();
  }

  getAll(slug): Promise<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments))
      .toPromise();
  }

  destroy(commentId, articleSlug) {
    return this.apiService.delete(`/articles/${articleSlug}/comments/${commentId}`).toPromise();
  }
}
