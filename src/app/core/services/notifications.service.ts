import { Injectable } from '@angular/core';
import { NotificationModel } from '../models/notification-model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _message$ = new ReplaySubject<NotificationModel>(1);
  message$ = this._message$.asObservable();

  constructor() {  }

  success(message: string) {
    this._message$.next(new NotificationModel(message));
  }

  error(message: string) {
    this._message$.next(new NotificationModel(message, 'error'));
  }
}
