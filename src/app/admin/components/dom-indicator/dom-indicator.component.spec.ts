import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomIndicatorComponent } from './dom-indicator.component';

describe('DomIndicatorComponent', () => {
  let component: DomIndicatorComponent;
  let fixture: ComponentFixture<DomIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
