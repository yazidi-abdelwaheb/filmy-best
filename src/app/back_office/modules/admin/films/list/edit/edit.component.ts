import { Component } from '@angular/core';
import { Film } from '../../../../../shared/models/film.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../../../../shared/services/films.service';
import { FormsModule } from '@angular/forms';
import Category from '../../../../../shared/models/category.model';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  film: Film = new Film();

  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(
    private fs: FilmsService,
    private cs: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fs.getOne(id).subscribe((data) => {
        this.film = data;
        this.selectedCategory = this.film.categories[0].id
      });
    }

    this.cs.all().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.film.categoriesIds = this.film.categories.map((e) => e.id);
    this.fs.updateOne(this.film.id, this.film).subscribe(() => {
       this.toastr.success(`Films "${this.film.title}" updated successfully!`)
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
  }

  isCategorySelected(itemId: string | number): boolean {
    return this.film.categories?.some((c) => c.id === itemId) || false;
  }

  deleteCategoriesSelected(itemId: string | number) {
    this.film.categories = this.film.categories.filter((c) => c.id !== itemId);
  }
}
