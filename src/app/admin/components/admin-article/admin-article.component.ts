import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AdminArticle } from '../../model/admin-article';
import { TextWidthService } from '../../../core/services/text-width.service';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit, OnChanges {
  @Input()
  article: AdminArticle;

  shortText: string;

  constructor(private textWidth: TextWidthService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.shortText = this.textWidth.fitTextIn(this.article.body, 150, 40);
  }
}
