import {
  Component,
  DoCheck,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { TextWidthService } from '../../../core/services/text-width.service';
import { Article } from '../../model/article';

let componentInstancesCount = 1;
@Component({
  selector: 'app-listener-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements DoCheck, OnInit {
  @Input()
  article: Article;

  count = componentInstancesCount;

  shortText: string;

  seeMore = true;
  showEllipsis: boolean;

  constructor(private textWidth: TextWidthService) {
    componentInstancesCount += 1;
  }

  ngOnInit() {
    this.longOperation();
  }

  ngDoCheck(): void {
    if (this.article) {
      const { body, width, height } = this.article;

      this.shortText = this.article.shortText = this.textWidth.fitTextIn(
        body,
        width,
        height
      );
      this.showEllipsis = this.shortText !== body;
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

  private longOperation() {
    // const d = new Date();
    for (let i = 0; i < 10000; i++) {
      const x = document.querySelectorAll('*').length;
    }
    // console.log(new Date().valueOf() - d.valueOf());
  }

  @HostListener('window:mouseout')
  fiveMsOperation() {
    // const d = new Date();
    for (let i = 0; i < 10000; i++) {
      const x = document.querySelectorAll('*').length;
    }
    // console.log(new Date().valueOf() - d.valueOf());
  }
}
