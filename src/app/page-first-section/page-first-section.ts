import { Component } from '@angular/core';
import {Header} from "../under-section/header/header";
import {MainBanner} from "../under-section/main-banner/main-banner";
import {Scroller} from "../under-section/scroller/scroller";

@Component({
  selector: 'app-page-first-section',
    imports: [
        Header,
        MainBanner,
        Scroller
    ],
  templateUrl: './page-first-section.html',
  styleUrl: './page-first-section.css',
})
export class PageFirstSection {

}
