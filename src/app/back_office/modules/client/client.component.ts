import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgIf } from '@angular/common';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { NotFoundService } from '../../shared/services/not-found.service';

@Component({
  selector: 'app-client',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    NgIf,
    NotFoundComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  isVisible = false;

  constructor(protected _404Service: NotFoundService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._404Service.set(false);
      }
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
