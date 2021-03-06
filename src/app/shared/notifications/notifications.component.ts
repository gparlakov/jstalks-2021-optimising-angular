import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../core/services/notifications.service';
import { NotificationModel } from '../../core/models/notification-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  template: `
    <p *ngIf="success" class="notification notification-success">
      {{ success }}
    </p>

    <p *ngIf="error" class="notification notification-error">
      {{ error }}
    </p>
  `,
  styles: [
    `
      .notification {
        position: fixed;
        bottom: 0;
        right: 15px;
      }

      .notification-success {
        border: 1px solid green;
      }

      .notification-error {
        border: 1px solid magenta;
      }
    `
  ]
})
export class NotificationsComponent implements OnInit {
  success: string;
  error: string;
  constructor(private notifications: NotificationsService) {}

  ngOnInit() {
    this.notifications.message$.subscribe(m => {
      if (m.type === 'success') {
        this.success = m.text;
      } else {
        this.error = m.text;
      }
    });
  }
}
