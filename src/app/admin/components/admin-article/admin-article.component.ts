import { Component, DoCheck, Input } from '@angular/core';
import { TextWidthService } from '../../../core/services/text-width.service';
import { AdminArticle } from '../../model/admin-article';

let componentInstancesCount = 1;
@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements DoCheck {
  @Input()
  article: AdminArticle;

  count = componentInstancesCount;

  shortText: string;

  seeMore = true;
  showEllipsis: boolean;

  constructor(private textWidth: TextWidthService) {
    componentInstancesCount += 1;
  }

  ngDoCheck(): void {
    if (this.article) {
      const { body, width, height } = this.article;
      this.shortText = this.article.shortText = this.textWidth.fitTextIn(body, width, height);
      this.showEllipsis = this.shortText !== body;
      console.log('cycle');
    }
  }

  buttonToggleSeeMoreClick() {
    this.seeMore = !this.seeMore;
  }

  text() {
    return this.seeMore
      ? this.shortText + (this.showEllipsis ? '...' : '')
      : this.article != null
      ? this.article.body
      : '';
  }
}
