import { Component, OnInit } from '@angular/core';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [NgFor , RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  categories: Category[] = [];

  page: number = 1;
  limit: number = 6;

  constructor(private cs: CategoriesService) {}

  loadData() {
    this.cs.list(this.page, this.limit).subscribe((data) => {
      // si data est un tableau
      this.categories = [...this.categories, ...data];
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
