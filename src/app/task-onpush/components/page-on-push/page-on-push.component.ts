import { Component, OnInit, DoCheck } from '@angular/core';
import { ArticleService } from '../../onpush-article.service';
import { Observable } from 'rxjs';
import { Article } from '../../model/article';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-on-push',
  templateUrl: './page-on-push.component.html',
  styleUrls: ['./page-on-push.component.css'],
})
export class PageOnPushComponent implements OnInit, DoCheck {
  articles$: Observable<Article[]>;
  constructor(private service: ArticleService) {}
  cdCycles = 0;

  ngDoCheck() {
    this.cdCycles += 1;
  }

  ngOnInit() {
    this.articles$ = this.service.articles$.pipe(
      filter((articles) => Array.isArray(articles)),
      map((articles) =>
        articles.map((a) => {
          // keep the reference same but update values
          a.width = 30;
          a.height = 20;
          return a;
        })
      )
    );
  }


  mockHandleEvent(event: Event) {
  }
}
