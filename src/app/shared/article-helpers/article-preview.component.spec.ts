import { ArticlePreviewComponent } from './article-preview.component';
import { Article } from '../../core';

describe('ArticlePreviewComponent', () => {
  it('should instantiate', () => {
    const c = new ArticlePreviewComponent();

    expect(c).toBeDefined();
  });

  it('when toggleFavorite called with true should increase favoritesCount and toggle favorited true', () => {
    const c = new ArticlePreviewComponent();
    c.article = { favoritesCount: 0 } as Article;

    c.onToggleFavorite(true);
    expect(c.article.favoritesCount).toBe(1);
    expect(c.article.favorited).toBe(true);
  });

  it('when toggleFavorite called with false should decrease favoritesCount and toggle favorited to false', () => {
    const c = new ArticlePreviewComponent();
    c.article = { favoritesCount: 1, favorited: true } as Article;

    c.onToggleFavorite(false);
    expect(c.article.favoritesCount).toBe(0);
    expect(c.article.favorited).toBe(false);
  });
});
