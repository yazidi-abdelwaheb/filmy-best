import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-list',
  imports: [FormsModule , PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  categories!: Category[];

  filteredcategories: Category[] = [];

  searchText = '';
  page = 1
  limit = 5
  hasNext = false

  constructor(
    private CategoryService: CategoriesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.CategoryService.list(this.page, this.limit,this.searchText).subscribe((data) => {
      this.categories = data;
      this.hasNext = data.length === this.limit;
    });
  }


  onPageChange(page: number) {
    this.page = page;
    this.loadData();
  }

  onLimitChange(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.loadData();
  }

  onSearch() {
    console.log(this.searchText)
    this.page = 1;
    this.loadData();
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
        this.filteredcategories = this.filteredcategories.filter(
          (f) => f.id !== id
        );
      });
    }
  }

  
}
