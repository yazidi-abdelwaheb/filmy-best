import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule , TitleCasePipe],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css',
})
export class SearchFilterComponent implements OnInit {
  @Input() sortChoix: string[] = [];

  @Output() loadData = new EventEmitter<{
    search?: string;
    filterCategory?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }>();
  @Output() initPage = new EventEmitter<any>();

  categories!: Category[];
  searchText!: string;
  sortBy!: string;
  orderSort: 'asc' | 'desc' = 'asc';
  selectedCategory: string = '';

  constructor(private cs: CategoriesService) {}

  ngOnInit(): void {
    this.cs.all().subscribe((data) => (this.categories = data));
    this.sortBy = this.sortChoix[0];
  }

  onSearch() {
    this.initPage.emit();
    this.loadData.emit({ search: this.searchText });
  }

  onReload() {
    this.initPage.emit();
    this.searchText = '';
    this.selectedCategory = '';
    this.sortBy = this.sortChoix[0];
    this.orderSort = "asc"
    this.loadData.emit();
  }

  onSortChange() {
    this.initPage.emit();
    this.loadData.emit({
      search: this.searchText,
      filterCategory: this.selectedCategory,
      sort: this.sortBy,
      order: this.orderSort,
    });
  }

  onOderChange() {
    this.initPage.emit();
    this.loadData.emit({
      search: this.searchText,
      filterCategory: this.selectedCategory,
      sort: this.sortBy,
      order: this.orderSort,
    });
  }

  onFilter() {
    this.initPage.emit();
    this.loadData.emit({
      search: this.searchText,
      filterCategory: this.selectedCategory,
    });
  }
}
