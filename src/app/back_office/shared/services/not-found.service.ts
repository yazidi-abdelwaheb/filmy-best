import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class NotFoundService {
  private _404 = signal<boolean>(false);

  constructor() {}

  get(): boolean {
    return this._404();
  }

  set(value: boolean): void {
    this._404.set(value);
  }

  toggle(): void {
    this._404.set(!this._404());
  }
}
