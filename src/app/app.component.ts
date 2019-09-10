import { Component, OnInit, Inject, Optional } from '@angular/core';

import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, @Inject('pusher') @Optional() pusher: string) {}

  ngOnInit() {
    this.userService.populate();
  }
}
