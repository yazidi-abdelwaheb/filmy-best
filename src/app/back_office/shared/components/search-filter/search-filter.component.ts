import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css',
})
export class SearchFilterComponent implements OnInit {
  @Input() sortChoix: string[] = [];
  @Input() page!: number;
  @Input() limit!: number;

  @Output() loadData = new EventEmitter<{search?:string,filterCategory?:string }>();

  categories!: Category[];
  searchText!: string;
  sortBy!: string;
  selectedCategory: string ="";

  constructor(private cs: CategoriesService) {}

  ngOnInit(): void {
    this.cs.all().subscribe((data) => (this.categories = data));
    this.sortBy = this.sortChoix[0]
  }

  onSearch() {
    this.page = 1;
    this.loadData.emit({search : this.searchText});
  }

  onReload() {
    this.page = 1;
    this.limit = 5;
    this.searchText=""
    this.selectedCategory=""
    this.sortBy=this.sortChoix[0]
    this.loadData.emit({search : this.searchText, filterCategory: this.selectedCategory});
  }

  onSortChange() {
    //this.sort.emit();
  }

  onFilter() {
   this.page = 1
    this.loadData.emit({ filterCategory: this.selectedCategory});
  }
}
