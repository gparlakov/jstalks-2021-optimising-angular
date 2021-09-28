import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { Article } from '../../model/article';

@Component({
  selector: 'app-listener-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class AdminArticlesListComponent implements OnInit {
  @Input()
  articles: Article[];

  constructor() {}

  ngOnInit() {
  }
}
