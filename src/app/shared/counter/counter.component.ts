import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input()
  count = 0;

  @Output()
  countChange = new EventEmitter<'increment' | 'decrement'>();

  onIncrementButtonClick() {
    this.countChange.emit('increment');
  }
  onDecrementButtonClick() {
    this.countChange.emit('decrement');
  }
}
