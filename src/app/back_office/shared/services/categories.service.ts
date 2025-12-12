import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environemnt from '../../../environemnts/environemnt.prod';
import Category from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environemnt.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

 list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  addOne(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateOne(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteOne(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
