import {
  AfterViewChecked, Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { TextWidthService } from '../../../core/services/text-width.service';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent
  implements DoCheck, OnInit, OnChanges, AfterViewChecked {
  @Input()
  article: Article;

  templateRenderCount = 0;
  shortText: string;

  seeMore = true;
  showEllipsis: boolean;

  constructor(private textWidth: TextWidthService) {  }

  ngOnInit() {
    if (this.article) {
      const { body, width, height } = this.article;

      this.shortText = this.textWidth.fitTextIn(body, width, height);
      this.showEllipsis = this.shortText !== body;
    }
  }

  ngDoCheck(): void {
    // console.log('runs for every Change Detect cycle even with OnPush!')

    // "ngDoCheck" is always getting executed
    // (irrespective of Default or OnPush) - https://github.com/angular/angular/issues/7054#issuecomment-227306686
    // CD strategy only affects the Template
    // hence using the text() method below which is called by the template
  }

  ngOnChanges() {}

  ngAfterViewChecked() {}

  buttonToggleSeeMoreClick() {
    this.seeMore = !this.seeMore;
  }

  templateRenders() {
      // see ngDoCheck too

      this.longOperation();
      // this will cause expressionChangedAfterItHasBeenCheckedError - that's OK:
      // we're using it to visualize how many times the template renders including the debugChangeDetection second cycle
      this.templateRenderCount += 1;

  }

  text() {
    this.templateRenders();

    if (this.article != null) {
      return this.seeMore
        ? this.shortText + (this.showEllipsis ? '...' : '')
        : this.article.body;
    }
  }

  private longOperation() {
    // const d = new Date();
    for (let i = 0; i < 10000; i++) {
      const x = document.querySelectorAll('*').length;
    }
    // console.log(new Date().valueOf() - d.valueOf());
  }

  private fiveMsOperation() {
    // const d = new Date();
    for (let i = 0; i < 800; i++) {
      const x = document.querySelectorAll('*').length;
    }
    // console.log(new Date().valueOf() - d.valueOf());
  }
}
