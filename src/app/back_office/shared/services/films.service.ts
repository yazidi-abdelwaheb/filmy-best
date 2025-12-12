import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import environemnt from '../../../environemnts/environemnt.prod';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private apiUrl = `${environemnt.apiUrl}/films`;

  constructor(private http: HttpClient) {}

 list(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}`);
  }

  getOne(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/${id}`);
  }

  addOne(film: Film): Observable<Film> {
    return this.http.post<Film>(this.apiUrl, film);
  }

  updateOne(id: string, film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/${id}`, film);
  }

  deleteOne(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
