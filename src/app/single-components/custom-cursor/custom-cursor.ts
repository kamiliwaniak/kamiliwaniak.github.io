import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  templateUrl: './custom-cursor.html',
  styleUrl: './custom-cursor.css',
})

export class CustomCursor implements AfterViewInit, OnDestroy {
  @ViewChild('cursor', { static: true }) cursorRef!: ElementRef<HTMLElement>;

  private cursorEl!: HTMLElement;

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  private readonly speed = 0.2;
  private isCursorVisible = false;

  private rafId: number | null = null;
  private unListeners: Array<() => void> = [];

  private readonly clickableSelector = `
    a, button, [role="button"], input[type="button"], input[type="submit"],
    label, summary, select, option, [onclick], [tabindex]:not([tabindex="-1"])
  `;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.cursorEl = this.cursorRef.nativeElement;
    if (!this.cursorEl.style.transition) {
      this.cursorEl.style.transition = 'opacity 120ms ease';
    }

    this.hideCursor();
    this.startAnimation();
    this.bindEvents();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.unListeners.forEach((u) => u());
    this.unListeners = [];
  }

  private startAnimation(): void {
    const step = () => {
      this.currentX += (this.targetX - this.currentX) * this.speed;
      this.currentY += (this.targetY - this.currentY) * this.speed;

      this.renderer.setStyle(this.cursorEl, 'left', `${this.currentX}px`);
      this.renderer.setStyle(this.cursorEl, 'top', `${this.currentY}px`);

      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  private bindEvents(): void {
    this.unListeners.push(
      this.renderer.listen('window', 'mousemove', (e: MouseEvent) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        this.showCursor();
      })
    );

    this.unListeners.push(
      this.renderer.listen('window', 'mousedown', () => {
        this.renderer.addClass(this.cursorEl, 'is-down');
      })
    );
    this.unListeners.push(
      this.renderer.listen('window', 'mouseup', () => {
        this.renderer.removeClass(this.cursorEl, 'is-down');
      })
    );

    this.unListeners.push(
      this.renderer.listen('document', 'mouseover', (e: MouseEvent) => {
        const el = this.closestClickable(e.target);
        if (el) this.renderer.addClass(this.cursorEl, 'is-pointer');
      })
    );

    this.unListeners.push(
      this.renderer.listen('document', 'mouseout', (e: MouseEvent) => {
        const fromClickable = this.closestClickable(e.target);
        const toClickable = this.closestClickable(e.relatedTarget);

        if (fromClickable && !toClickable) {
          this.renderer.removeClass(this.cursorEl, 'is-pointer');
        }
      })
    );

    this.unListeners.push(
      this.renderer.listen(document.documentElement, 'mouseleave', () => this.hideCursor())
    );
    this.unListeners.push(
      this.renderer.listen(document.documentElement, 'mouseenter', () => this.showCursor())
    );

    this.unListeners.push(this.renderer.listen('window', 'blur', () => this.hideCursor()));

    this.unListeners.push(
      this.renderer.listen('document', 'visibilitychange', () => {
        if (document.hidden) this.hideCursor();
      })
    );

    const onTouchStart = () => {
      this.renderer.setStyle(this.cursorEl, 'display', 'none');
      this.renderer.setStyle(document.documentElement, 'cursor', 'auto');
      this.renderer.setStyle(document.body, 'cursor', 'auto');
      document.removeEventListener('touchstart', onTouchStart);
    };
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    this.unListeners.push(() => document.removeEventListener('touchstart', onTouchStart));
  }

  private showCursor(): void {
    if (!this.isCursorVisible) {
      this.renderer.setStyle(this.cursorEl, 'opacity', '1');
      this.isCursorVisible = true;
    }
  }

  private hideCursor(): void {
    if (this.isCursorVisible) {
      this.renderer.setStyle(this.cursorEl, 'opacity', '0');
      this.isCursorVisible = false;
    }
    this.renderer.removeClass(this.cursorEl, 'is-down');
    this.renderer.removeClass(this.cursorEl, 'is-pointer');
  }

  private closestClickable(target: EventTarget | null): Element | null {
    if (target instanceof Element) {
      return target.closest(this.clickableSelector);
    }
    return null;
  }
}
