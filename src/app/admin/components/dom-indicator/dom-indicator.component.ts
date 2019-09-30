import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { config } from '../../model/config';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-dom-indicator',
  templateUrl: './dom-indicator.component.html',
  styleUrls: ['./dom-indicator.component.css']
})
export class DomIndicatorComponent {
  degree = 0;

  @ViewChild('indicator')
  indicator: ElementRef;

  c = config.pipe(map(v => v.repetitions));

  constructor() {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        this.rotate();
      });
    }
  }

  rotate() {
    if (this.indicator != null && this.indicator.nativeElement != null) {
      this.indicator.nativeElement.style.transform = `rotate(${this.degree}deg)`;
      this.degree += 10;
      this.degree = this.degree > 360 ? 0 : this.degree;
    }
    window.requestAnimationFrame(() => {
      this.rotate();
    });
  }

  update(event: Event) {
    config
      .pipe(take(1))
      .subscribe(v =>
        config.next({ ...v, repetitions: Number((event.target as HTMLInputElement).value) })
      );
  }
}
