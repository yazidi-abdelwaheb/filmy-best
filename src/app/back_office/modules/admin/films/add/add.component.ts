import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
@Component({
  selector: 'app-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  film: Film = new Film();
  categories: Category[] = [];
  selectedCategory: string ="";

  constructor(
    private fs: FilmsService,
    private router: Router,
    private cs: CategoriesService
  ) {}

  ngOnInit(): void {
    this.film.categories = [];
    this.cs.all().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.film.categoriesIds = this.film.categories.map(e=>e.id)
    this.fs.addOne(this.film).subscribe(() => {
      this.router.navigate(['/admin/film']);
    });
  }

  onSelectCategories() {
    if (this.selectedCategory) {
      const categoryToAdd = this.categories.find(
        (e) => e.id === this.selectedCategory
      );
      if (categoryToAdd) {
        if (!this.film.categories.some((c) => c.id === categoryToAdd.id)) {
          this.film.categories = [...this.film.categories, categoryToAdd];
        }
      }
    }

    this.selectedCategory=""
  }

  isCategorySelected(itemId: string | number): boolean {
    return this.film.categories?.some((c) => c.id === itemId) || false;
  }

  deleteCategoriesSelected(itemId: string | number){
    this.film.categories = this.film.categories.filter(c => c.id !== itemId);
  }
}
