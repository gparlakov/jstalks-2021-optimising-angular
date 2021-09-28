import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ArticleService } from '../../listener-article.service';
import { ArticleDimensionProps } from '../../model/dimensions';

@Component({
  selector: 'app-article-dimensions-control',
  templateUrl: './article-dimensions-control.component.html',
  styleUrls: ['./article-dimensions-control.component.css']
})
export class AdminArticleVisualizeControlComponent implements OnInit {
  by$ = this.articleService.articleDimensions$.pipe(map(cfg => cfg.by));
  width$ = this.articleService.articleDimensions$.pipe(map(cfg => cfg.width));

  constructor(private articleService: ArticleService) {}

  ngOnInit() {}

  onChangeByInput(event: 'increment' | 'decrement') {
    this.doChange(event, 'by');
  }

  onWidthInput(event: 'increment' | 'decrement') {
    this.doChange(event, 'width');
  }

  private doChange(event: 'increment' | 'decrement', p: ArticleDimensionProps) {
    this.articleService.articleDimensions$.pipe(take(1)).subscribe(v => {
      let value = v.by;
      if (p === 'by') {
        value = 1;
      }
      this.articleService.onArticleDimensionsChange(p, event === 'increment' ? v[p] + value : v[p] - value);
    });
  }
}
