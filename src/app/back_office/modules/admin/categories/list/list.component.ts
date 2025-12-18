import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { ToCapitaleCasePipe } from '../../../../shared/pipes/to-capitale-case.pipe';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-list',
  imports: [
    FormsModule,
    PaginationComponent,
    ConfirmComponent,
    ToCapitaleCasePipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  categories!: Category[];

  searchText = '';
  page = 1;
  limit = 5;
  hasNext = false;

  constructor(
    private CategoryService: CategoriesService,
    private route: Router,
    private confirmService: ConfirmService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.CategoryService.list(this.page, this.limit, this.searchText).subscribe(
      (data) => {
        this.categories = data;
        this.hasNext = data.length === this.limit;
      }
    );
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
    console.log(this.searchText);
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

  onDelete(category: Category) {
    this.confirmService
      .open(
        'Delete Category',
        `Are you sure you want to delete this category : <strong class="text-danger">${category.label.toUpperCase()}</strong> ?`
      )
      .subscribe((result) => {
        if (result) {
          this.CategoryService.deleteOne(category.id).subscribe(() => {
            this.toastr.info(
              `Category <strong class="text-danger">${category.label.toUpperCase()}</strong> deteted successufully!`
            );
            this.categories = this.categories.filter(
              (f) => f.id !== category.id
            );
          });
        }
      });
  }
}
