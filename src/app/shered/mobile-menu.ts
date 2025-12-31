import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MobileMenuService {
  private readonly _open$ = new BehaviorSubject<boolean>(false);
  readonly open$ = this._open$.asObservable();

  open() {
    this._open$.next(true);
    document.body.classList.add('no-scroll');
  }

  close() {
    this._open$.next(false);
    document.body.classList.remove('no-scroll');
  }

  toggle() {
    this._open$.value ? this.close() : this.open();
  }
}
