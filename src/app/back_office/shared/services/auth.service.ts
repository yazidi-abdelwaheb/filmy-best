import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import environemnt from '../../../environemnts/environemnt';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Service mock pour authentification.
   * Pour un vrai backend, remplace les méthodes avec des appels HTTP.
   */

  private api = `${environemnt.apiUrl}/auth`;
  private admins: Admin[] = [];

  constructor(private http: HttpClient) {
    // table mock (à supprimer si tu utilises un vrai backend)
    this.admins = [
      { id: '1', username: 'admin', password: 'admin', role: 'super' },
      { id: '2', username: 'moderator', password: '1234', role: 'admin' },
    ];
  }

  signIn(username: string, password: string): Admin | null {
    const admin = this.admins.find(
      (e) => e.username === username && e.password === password
    );

    if (admin) {
      localStorage.setItem('admin', admin.id);
      return admin
    }

    return null;
  }

  
  signOut(): void {
    localStorage.removeItem('admin');
  }

 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

 
  isAdmin(): boolean {
    const id = localStorage.getItem('admin');
    if (!id) return false;

    const admin = this.admins.find((e) => e.id === id);
    return admin ? ['super', 'admin'].includes(admin.role) : false;
  }

  
  getCurrentAdmin(): Admin | null {
    const id = localStorage.getItem('admin');
    if (!id) return null;

    return this.admins.find((e) => e.id === id) || null;
  }
}
