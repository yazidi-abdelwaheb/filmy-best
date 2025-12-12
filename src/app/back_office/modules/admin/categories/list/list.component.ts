import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';

@Component({
  selector: 'app-list',
  imports: [NgFor, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  categories: Category[] = [];
  filteredcategories: Category[] = [];

  searchText = '';

  constructor(
    private CategoryService: CategoriesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.CategoryService.list().subscribe((data) => {
      this.categories = data;
      this.filteredcategories = [...this.categories];
    });
  }

  onEdit(id: string) {
    this.route.navigate([`/admin/category/${id.toString()}/edit`]);
    // navigate to /films/edit/:id
  }

  onAdd() {
    this.route.navigate([`/admin/category/add`]);
    // navigate to /films/add
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this film?')) {
      this.CategoryService.deleteOne(id).subscribe(() => {
        this.categories = this.categories.filter((f) => f.id !== id);
        this.filteredcategories = this.filteredcategories.filter(f=>f.id!==id)
      });
    }
  }

  onSearch() {
    this.filteredcategories = this.categories;
    this.filteredcategories = this.filteredcategories.filter((e) =>
      e.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
