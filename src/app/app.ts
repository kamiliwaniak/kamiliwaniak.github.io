import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursor } from './single-components/custom-cursor/custom-cursor'
import { SplashScreen } from './single-components/splash-screen/splash-screen';
import { BurgerMenu } from './single-components/burger-menu/burger-menu'
import {PageFirstSection} from './page-first-section/page-first-section';
import {PageSecondSection} from './page-second-section/page-second-section';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursor, SplashScreen, PageFirstSection, PageSecondSection, BurgerMenu,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Kamil Iwaniak');
}
