
export type ArticleDimensionProps = Exclude<keyof ArticleDimensions, 'with'>;

export class ArticleDimensions {
  constructor(public width = 50, public by = 5, public height = 20) {}
  static default = new ArticleDimensions();
  with(p: ArticleDimensionProps, v: ArticleDimensions[ArticleDimensionProps]) {
    return Object.assign(this, { [p]: v });
  }
}
