import {Component, Input} from '@angular/core';
import {NgClass, ViewportScroller} from '@angular/common';

type Theme = 'light' | 'dark';
type Icon = 'up-wa' | 'up-ba' | 'd-wa' | 'd-ba';
type Target = 'main-header' | 'hub';


@Component({
  selector: 'app-scroller',
  standalone: true,
  imports: [NgClass],
  templateUrl: './scroller.html',
  styleUrl: './scroller.css',
})
export class Scroller {
  @Input({ required: true }) theme!: Theme;
  @Input({ required: true }) icon!: Icon;
  @Input({ required: true }) target!: Target;

  @Input() icon2?: Icon;
  @Input() target2?: Target;

  constructor(private viewport: ViewportScroller) {}

  scrollTo(anchor: string, e?: MouseEvent) {
    e?.preventDefault();
    if (!anchor) return;
    this.viewport.scrollToAnchor(anchor);
  }
}
