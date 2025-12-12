import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environemnt from '../../../environemnts/environemnt.prod';
import {Serie} from "../models/serie.model"

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private apiUrl = `${environemnt.apiUrl}/series`;

  constructor(private http: HttpClient) {}

 list(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}`);
  }

  getOne(id: string): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/${id}`);
  }

  addOne(film: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.apiUrl, film);
  }

  updateOne(id: string, film: Serie): Observable<Serie> {
    return this.http.put<Serie>(`${this.apiUrl}/${id}`, film);
  }

  deleteOne(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
