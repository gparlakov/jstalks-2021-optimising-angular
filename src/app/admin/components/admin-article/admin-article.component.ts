import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
  ChangeDetectorRef
} from '@angular/core';
import { AdminArticle } from '../../model/admin-article';
import { TextWidthService } from '../../../core/services/text-width.service';
import { config } from '../../model/config';
import { take } from 'rxjs/operators';

let all = 1;
@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit, OnChanges, DoCheck {
  @Input()
  article: AdminArticle;

  articles = all;

  shortText: string;

  seeMore = true;
  showEllipsis: boolean;

  constructor(private textWidth: TextWidthService, private changeRef: ChangeDetectorRef) {
    all += 1;
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.article) {
      config.pipe(take(1)).subscribe(({ repetitions }) => {
        for (let i = 0; i < repetitions; i++) {
          this.shortText = this.textWidth.fitTextIn(this.article.body, 90, 20);
          this.showEllipsis = this.shortText !== this.article.body;
        }
      });
    }
  }
  ngDoCheck(): void {
    this.changeRef.detectChanges();
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
