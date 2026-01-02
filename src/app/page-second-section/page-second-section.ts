import { Component } from '@angular/core';
import {Header} from "../under-section/header/header";
import {MainBanner} from "../under-section/main-banner/main-banner";
import {Scroller} from "../under-section/scroller/scroller";
import {Hub} from '../under-section/hub/hub';

@Component({
  selector: 'app-page-second-section',
  imports: [
    Scroller,
    Hub
  ],
  templateUrl: './page-second-section.html',
  styleUrl: './page-second-section.css',
})
export class PageSecondSection {

}
