import { Component, DoCheck, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { TextWidthService } from '../../../core/services/text-width.service';
import { AdminArticle } from '../../model/admin-article';
import { config } from '../../model/config';
import { AdminArticleComponentService } from '../../model/Props';

let all = 1;
@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements DoCheck {
  @Input()
  article: AdminArticle;

  articles = all;

  shortText: string;

  seeMore = true;
  showEllipsis: boolean;

  constructor(
    private textWidth: TextWidthService,
    private configService: AdminArticleComponentService
  ) {
    all += 1;
  }

  ngDoCheck(): void {
    if (this.article) {
      this.configService.articleConfig$.pipe(take(1)).subscribe(({ width, height }) => {
        this.shortText = this.textWidth.fitTextIn(this.article.body, width, height);
        this.showEllipsis = this.shortText !== this.article.body;
        console.log('cycle');
      });
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
