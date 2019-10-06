import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleVisualizeControlComponent } from './admin-article-visualize-control.component';

describe('AdminArticleVisualizeControlComponent', () => {
  let component: AdminArticleVisualizeControlComponent;
  let fixture: ComponentFixture<AdminArticleVisualizeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleVisualizeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleVisualizeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
