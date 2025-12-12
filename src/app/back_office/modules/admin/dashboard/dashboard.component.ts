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
films: Film[] = [];
  totalFilms: number = 0;
  totalCategories: number = 0;

  recentFilms: Film[] = [];

  categories: Category[] = [];

  constructor(private fs: FilmsService , private cs : CategoriesService) {}

  ngOnInit(): void {
    this.loadFilms();
    this.loadCategory()
  }

  loadFilms() {
    this.fs.list().subscribe((data) => {
      this.films = data;
      this.totalFilms = data.length;
    });
  }

  loadCategory() {
    this.cs.list().subscribe((data) => {
      this.categories = data;
      this.totalCategories = data.length;
    });
  }
}
