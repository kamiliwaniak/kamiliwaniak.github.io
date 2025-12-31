import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursor } from './custom-cursor/custom-cursor'
import { SplashScreen } from './splash-screen/splash-screen';
import { Header } from './header/header'
import { MainBanner } from './main-banner/main-banner'
import { Scroller } from './scroller/scroller'
import { Hub } from './hub/hub'
import { BurgerMenu } from './burger-menu/burger-menu'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursor, SplashScreen, BurgerMenu, Header, MainBanner, Scroller, Hub],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Kamil Iwaniak');
}
