import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('admin') || '{}');
    return user.role === 'admin';
  }
}
