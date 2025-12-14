import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../shared/services/categories.service';
import Category from '../../../../shared/models/category.model';
import { SeriesService } from '../../../../shared/services/series.service';
import { Serie } from '../../../../shared/models/serie.model';

@Component({
  selector: 'app-list',
  imports: [NgFor, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  series: Serie[] = [];
  filteredseries: Serie[] = [];

  searchText = '';
  selectedCategory = '';
  sortBy = 'title';

  categories: Category[] = [];

  constructor(private serieService: SeriesService, private route: Router , private categoryService : CategoriesService) {}

  ngOnInit(): void {
    this.serieService.list().subscribe((data) => {
      this.series = data;
      this.filteredseries = [...this.series];
    });

    this.categoryService.all().subscribe((data)=>this.categories = data)

  }

  filterFilms() {
    this.filteredseries = this.series.filter((f) =>
      f.title.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.selectedCategory !== '') {
      this.filteredseries = this.filteredseries.filter(
        (f) => f.categories.filter(c=>c.id === this.selectedCategory)
      );
    }

    this.sort();
  }

  sort() {
    if (this.sortBy === 'title') {
      this.filteredseries.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'rating') {
      this.filteredseries.sort((a, b) => b.rating - a.rating);
    }
  }

  onShow(id: string) {
    this.route.navigate([`/admin/series/${id.toString()}`]);
  }

  onEdit(id: string) {
    this.route.navigate([`/admin/series/${id.toString()}/edit`]);
  }

  onAdd() {
    this.route.navigate([`/admin/series/add`]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this film?')) {
      this.serieService.deleteOne(id).subscribe(() => {
        this.series = this.series.filter((f) => f.id !== id);
        this.filterFilms();
      });
    }
  }
}
