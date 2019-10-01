import { Observable } from 'rxjs';

export type Props = Exclude<keyof ArticleComponentConfig, 'with'>;

export class ArticleComponentConfig {
  constructor(public width = 50, public by = 5, public height = 20) {}
  static default = new ArticleComponentConfig();
  with(p: Props, v: ArticleComponentConfig[Props]) {
    return Object.assign(this, { [p]: v });
  }
}
export abstract class AdminArticleComponentService {
  abstract articleConfig$: Observable<ArticleComponentConfig>;
}
