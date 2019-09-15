import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from '../../core/services/notifications.service';
import { Subject, ReplaySubject } from 'rxjs';
import { NotificationModel } from '../../core/models/notification-model';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let notificationsService: any;

  beforeEach(async(() => {
    // notificationsService = jasmine.createSpyObj('notificationsService', ['success', 'error']);
    notificationsService = { message$: new ReplaySubject<any>(1), success: jest.fn(), error: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      providers: [{ provide: NotificationsService, useValue: notificationsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when message$ emits success should populate local `success`', inject(
    [NotificationsService],
    (n: NotificationsService) => {
      n.message$ = new Subject<NotificationModel>();
      component.ngOnInit();
      (n as any).message$.next(new NotificationModel('Test this'));
      expect(component.success).toEqual('Test this');
    }
  ));
});
