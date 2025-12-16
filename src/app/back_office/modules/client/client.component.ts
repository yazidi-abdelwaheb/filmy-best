import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [RouterOutlet , NavbarComponent,FooterComponent,NgIf],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
isVisible = false;

  // Détecte le scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300; // bouton visible après 300px
  }

  // Action scroll top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
