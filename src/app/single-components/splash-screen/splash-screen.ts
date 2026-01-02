import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, HostListener } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.css',
})
export class SplashScreen implements AfterViewInit, OnDestroy {
  @ViewChild('splash', { static: true }) splashRef!: ElementRef<HTMLElement>;
  @ViewChild('card', { static: true }) cardRef!: ElementRef<HTMLElement>;

  isHidden = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.openSplash(), 0);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  openSplash(): void {
    this.isHidden = false;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  closeSplash(): void {
    this.isHidden = true;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  @HostListener('click', ['$event'])
  onSplashClick(event: MouseEvent): void {
    if (event.target === this.splashRef.nativeElement) {
      this.closeSplash();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.isHidden) {
      this.closeSplash();
    }
  }
}
