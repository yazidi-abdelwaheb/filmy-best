import { Component } from '@angular/core';
import { Film } from '../../../shared/models/film.model';
import { FilmsService } from '../../../shared/services/films.service';
import Category from '../../../shared/models/category.model';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  totalFilms: number = 16;
  totalCategories: number = 20;
  totalSeries : number = 30;

  constructor() {}

 
}
