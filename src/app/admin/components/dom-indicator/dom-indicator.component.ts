import { Component, OnInit, DoCheck, ViewChild, ElementRef, NgZone } from '@angular/core';
import { config } from '../../model/config';
import { take, map } from 'rxjs/operators';
import { AdminArticleService } from '../../admin-article.service';
import { Props } from '../../model/Props';

@Component({
  selector: 'app-dom-indicator',
  templateUrl: './dom-indicator.component.html',
  styleUrls: ['./dom-indicator.component.css']
})
export class DomIndicatorComponent {
  degree = 0;

  @ViewChild('indicator')
  indicator: ElementRef;

  by$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.by));
  width$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.width));
  height$ = this.articleService.articleConfig$.pipe(map(cfg => cfg.height));

  constructor(private zone: NgZone, private articleService: AdminArticleService) {
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

  private doChange(event: string, p: Props) {
    this.articleService.articleConfig$.pipe(take(1)).subscribe(v => {
      let value = v.by;
      if (p === 'by') {
        value = 1;
      }
      this.articleService.onArticleChange(p, event === 'increment' ? v[p] + value : v[p] - value);
    });
  }
}
