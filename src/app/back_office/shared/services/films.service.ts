import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Film } from '../models/film.model';
import environemnt from '../../../environemnts/environemnt.prod';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private apiUrl = `${environemnt.apiUrl}/films`;

  constructor(private http: HttpClient) {}
  private total!: number;

  getTotal(): number {
    return this.total;
  }

  list(
    page: number,
    limit: number,
    categoryId?: string,
    title?: string,
    sortBy?: string,
    orderSort?: 'asc' | 'desc'
  ): Observable<Film[]> {
    let params = new HttpParams();

    if (title) {
      params = params.set('title_like', title);
    }

    if (categoryId) {
      params = params.set('categories[0].id', categoryId);
    }

    const sort = sortBy ? sortBy : 'title';
    const order = orderSort ? orderSort : 'asc';

    params = params.set('_sort', sort);
    params = params.set('_order', order);

    params = params.set('_page', page);
    params = params.set('_limit', limit);

    return this.http.get<Film[]>(this.apiUrl, { params });
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
