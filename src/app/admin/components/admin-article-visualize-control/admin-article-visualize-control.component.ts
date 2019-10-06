import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AdminArticleService } from '../../admin-article.service';
import { ArticleDimensionProps } from '../../model/admin-article-dimensions';

@Component({
  selector: 'app-admin-article-visualize-control',
  templateUrl: './admin-article-visualize-control.component.html',
  styleUrls: ['./admin-article-visualize-control.component.css']
})
export class AdminArticleVisualizeControlComponent implements OnInit {
  by$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.by));
  width$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.width));
  height$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.height));

  constructor(private articleService: AdminArticleService) {}

  ngOnInit() {}

  onChangeByInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'by');
  }

  onChangeWithInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'width');
  }

  onChangeHeightInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'height');
  }

  private doChange(event: 'increment' | 'decrement', p: ArticleDimensionProps) {
    this.articleService.articleConfig$.pipe(take(1)).subscribe(v => {
      let value = v.by;
      if (p === 'by') {
        value = 1;
      }
      this.articleService.onArticleChange(p, event === 'increment' ? v[p] + value : v[p] - value);
    });
  }
}
