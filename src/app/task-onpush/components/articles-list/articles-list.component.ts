import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../model/article';

@Component({
  selector: 'app-onpush-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  @Input()
  articles: Article[];

  constructor() {}

  ngOnInit() {
  }
}
