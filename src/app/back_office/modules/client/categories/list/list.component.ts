import { Component, OnInit } from '@angular/core';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShowMoreBtnComponent } from '../../../../shared/components/show-more-btn/show-more-btn.component';

@Component({
  selector: 'app-list',
  imports: [NgFor , RouterLink , ShowMoreBtnComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  categories: Category[] = [];

  page: number = 1;
  limit: number = 6;
  isLoading : boolean = false

  constructor(private cs: CategoriesService) {}

  loadData() {
    this.isLoading = true;
    this.cs.list(this.page, this.limit).subscribe({
      next: (data) => {
        this.categories = [...this.categories, ...data];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  showMore() {
    this.page++;
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }
}
