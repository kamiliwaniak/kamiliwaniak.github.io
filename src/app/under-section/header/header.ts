import { Component } from '@angular/core';
import { MobileMenuService} from '../../shered/mobile-menu';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public mobileMenu: MobileMenuService) {}

  goTo(id: string) {

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
}


