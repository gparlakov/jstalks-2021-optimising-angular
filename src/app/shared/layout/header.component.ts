import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User, UserService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  currentUser: User;

  @Output()
  notificationsEnable = new EventEmitter();

  notificationsButtonVisible = true;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  onUserWantsNotificationsButtonClick() {
    this.notificationsEnable.emit(true);
    this.notificationsButtonVisible = false;
  }
}
