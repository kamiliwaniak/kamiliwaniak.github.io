import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MobileMenuService } from '../shered/mobile-menu';
import {timeout} from 'rxjs';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.css',
})
export class BurgerMenu {
  constructor(public mobileMenu: MobileMenuService) {}

  close() { this.mobileMenu.close();}

  goTo(id: string) {
    this.close();

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}
