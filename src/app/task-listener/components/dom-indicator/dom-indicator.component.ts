import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ArticleService } from '../../listener-article.service';
import { ArticleDimensionProps } from '../../model/dimensions';

@Component({
  selector: 'app-dom-indicator',
  templateUrl: './dom-indicator.component.html',
  styleUrls: ['./dom-indicator.component.css']
})
export class DomIndicatorComponent {
  degree = 0;

  @ViewChild('indicator')
  indicator: ElementRef;

  by$ = this.articleService.articleDimensions$.pipe(map(cfg => cfg.by));
  width$ = this.articleService.articleDimensions$.pipe(map(cfg => cfg.width));
  height$ = this.articleService.articleDimensions$.pipe(map(cfg => cfg.height));

  constructor(private zone: NgZone, private articleService: ArticleService) {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        this.rotate();
      });
    }
  }

  rotate() {
    this.zone.runOutsideAngular(() => {
      if (this.indicator != null && this.indicator.nativeElement != null) {
        this.indicator.nativeElement.style.transform = `rotate(${this.degree}deg)`;
        this.degree += 10;
        this.degree = this.degree > 360 ? 0 : this.degree;
      }
      window.requestAnimationFrame(() => {
        this.rotate();
      });
    });
  }

  onChangeByInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'by');
  }

  onChangeWithInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'width');
  }

  onChangeHeightInputChange(event: 'increment' | 'decrement') {
    this.doChange(event, 'height');
  }

  private doChange(event: string, p: ArticleDimensionProps) {
    this.articleService.articleDimensions$.pipe(take(1)).subscribe(v => {
      let value = v.by;
      if (p === 'by') {
        value = 1;
      }
      this.articleService.onArticleDimensionsChange(p, event === 'increment' ? v[p] + value : v[p] - value);
    });
  }
}
