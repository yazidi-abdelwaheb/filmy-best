import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(protected authService: AuthService, private router: Router) {}


  logout() {
    localStorage.removeItem('admin')
    this.router.navigate(['/admin/sign-in']);
  }
}
