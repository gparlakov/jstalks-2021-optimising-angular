import { Component, OnInit, HostListener } from '@angular/core';
import { AdminArticleService } from './admin-article.service';
import { AdminArticle } from './model/admin-article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  articles$: Observable<AdminArticle[]>;
  constructor(private adminService: AdminArticleService) {}

  ngOnInit() {
    // inform our admin service that the admin has entered
    this.adminService.onAdminEnter();

    this.articles$ = this.adminService.articles$;
  }

  @HostListener('window: hover')
  check() {}
}
