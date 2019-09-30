import { TestBed } from '@angular/core/testing';

import { TextWidthService } from './text-width.service';

describe('TextWidthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextWidthService = TestBed.get(TextWidthService);
    expect(service).toBeTruthy();
  });
});
