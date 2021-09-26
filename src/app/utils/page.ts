export class Page<T> {
  private readonly _content!: T;

  get content(): T {
    return this._content;
  }
}
