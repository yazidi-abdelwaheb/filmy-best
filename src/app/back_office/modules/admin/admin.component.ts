import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Admin } from '../../shared/models/admin.model';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
   admin!: Admin | null;
  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.admin = this.authService.getCurrentAdmin();
  }
  logout() {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
