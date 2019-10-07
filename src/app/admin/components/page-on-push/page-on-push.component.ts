import { Component, OnInit, DoCheck } from '@angular/core';
import { AdminArticleService } from '../../admin-article.service';
import { Observable } from 'rxjs';
import { AdminArticle } from '../../model/admin-article';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-on-push',
  templateUrl: './page-on-push.component.html',
  styleUrls: ['./page-on-push.component.css']
})
export class PageOnPushComponent implements OnInit, DoCheck {
  articles$: Observable<AdminArticle[]>;

  constructor(private service: AdminArticleService) {}

  ngOnInit() {
    this.refreshArticles();
  }

  ngDoCheck() {
    // this.refreshArticles();
  }

  private refreshArticles() {
    this.articles$ = this.service.article100Cache().pipe(
      filter(articles => Array.isArray(articles)),
      map(articles =>
        articles.map(a => {
          // keep the reference same but update values
          a.width = 30;
          a.height = 20;
          a.counterType = 'changeDetections';
          return a;
        })
      )
    );
  }

  mockHandleEvent(event: Event) {
    console.log(event);
    const array = new Array();
    for (let i = 0; i < 999999; i++) {
      array.push(event); // push is a slow operation
    }
    this.refreshArticles();
  }
}
