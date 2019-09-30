import { TestBed } from '@angular/core/testing';

import { AdminArticleService } from './admin-article.service';

describe('AdminArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminArticleService = TestBed.get(AdminArticleService);
    expect(service).toBeTruthy();
  });
});
