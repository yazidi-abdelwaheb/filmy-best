import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Category from '../../../shared/models/category.model';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true, // si tu utilises Angular standalone
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  page: number = 1;
  limit: number = 5;

  constructor(private cs: CategoriesService) {}

  loadData() {
    this.cs.list(this.page, this.limit).subscribe(data => {
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
