import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-debounce',
  templateUrl: './page-debounce.component.html',
  styleUrls: ['./page-debounce.component.css']
})
export class PageDebounceComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.searchForm.valueChanges.subscribe(v => {
    //   this.searchService.doSearch()
    // })
  }
}
