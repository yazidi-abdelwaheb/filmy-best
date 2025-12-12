import { Component } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { Router } from '@angular/router';
import { NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../shared/services/categories.service';
import Category from '../../../../shared/models/category.model';

@Component({
  selector: 'app-list',
  imports: [NgFor, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  films: Film[] = [];
  filteredFilms: Film[] = [];

  searchText = '';
  selectedCategory = '';
  sortBy = 'title';

  categories: Category[] = [];

  constructor(private filmService: FilmsService, private route: Router , private categoryService : CategoriesService) {}

  ngOnInit(): void {
    this.filmService.list().subscribe((data) => {
      this.films = data;
      this.filteredFilms = [...this.films];
    });

    this.categoryService.list().subscribe((data)=>this.categories = data)

  }

  filterFilms() {
    this.filteredFilms = this.films.filter((f) =>
      f.title.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.selectedCategory !== '') {
      this.filteredFilms = this.filteredFilms.filter(
        (f) => f.category.id === this.selectedCategory
      );
    }

    this.sortFilms();
  }

  sortFilms() {
    if (this.sortBy === 'title') {
      this.filteredFilms.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'rating') {
      this.filteredFilms.sort((a, b) => b.rating - a.rating);
    }
  }

  onShow(id: string) {
    this.route.navigate([`/admin/film/${id.toString()}`]);
    // navigate to /films/:id
  }

  onEdit(id: string) {
    this.route.navigate([`/admin/film/${id.toString()}/edit`]);
    // navigate to /films/edit/:id
  }

  onAdd() {
    this.route.navigate([`/admin/film/add`]);
    // navigate to /films/add
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this film?')) {
      this.filmService.deleteOne(id).subscribe(() => {
        this.films = this.films.filter((f) => f.id !== id);
        this.filterFilms();
      });
    }
  }
}
