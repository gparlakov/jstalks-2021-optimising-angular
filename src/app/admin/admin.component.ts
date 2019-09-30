import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @HostListener('window: hover')
  check() {

  }
}
