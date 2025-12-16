import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import environemnt from '../../../environemnts/environemnt.prod';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A service for processing data using a JSON server;
   * if you are processing using a real backend system, change this service.
   */

  private api = `${environemnt.apiUrl}/auth`;
  private admins: Admin[] = [];
  constructor(private http: HttpClient) {
    //delete this table
    this.admins = [
      { id: '1', username: 'admin', password: 'admin', role: 'super' },
    ];
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('admin') || '{}');
    return user.role === 'admin';
  }
}
