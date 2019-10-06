import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminArticleService } from '../../../admin-article.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(private adminArticlesService: AdminArticleService) {}

  ngOnInit() {
    this.adminArticlesService.onSearch(this.searchControl.valueChanges);
  }
}
