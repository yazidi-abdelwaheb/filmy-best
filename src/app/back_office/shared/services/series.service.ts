import { HttpClient, HttpParams } from '@angular/common/http';
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

 list(
    page: number,
    limit: number,
    categoryId?: string,
    title?: string,
    sortBy?: string,
    orderSort?: 'asc' | 'desc'
  ): Observable<Serie[]> {
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

    return this.http.get<Serie[]>(this.apiUrl, { params });
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
