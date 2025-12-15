import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../shared/services/categories.service';
import Category from '../../../../shared/models/category.model';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchFilterComponent } from '../../../../shared/components/search-filter/search-filter.component';

@Component({
  selector: 'app-list',
  imports: [
    StarRatingComponent,
    DurationPipe,
    PaginationComponent,
    SearchFilterComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  films: Film[] = [];

  page = 1;
  limit = 5;
  hasNext = false;

  constructor(
    private filmService: FilmsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Méthode loadData adaptée pour recevoir un objet
  loadData(params?: {
    search?: string;
    filterCategory?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    this.filmService
      .list(
        this.page,
        this.limit,
        params?.filterCategory ? params?.filterCategory : '',
        params?.search ? params?.search : '',
        params?.sort ? params?.sort : 'title',
        params?.order ? params?.order : 'asc'
      )
      .subscribe((data) => {
        this.films = data;
        this.hasNext = data.length === this.limit;
      });
  }

  initPageTo1() {
    this.page = 1;
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

  /** Navigation */
  onShow(id: string) {
    this.router.navigate(['/admin/film', id]);
  }

  onEdit(id: string) {
    this.router.navigate(['/admin/film', id, 'edit']);
  }

  onAdd() {
    this.router.navigate(['/admin/film/add']);
  }

  onDelete(id: string) {
    if (!confirm('Êtes-vous sûr ?')) return;

    this.filmService.deleteOne(id).subscribe(() => {
      if (this.films.length === 1 && this.page > 1) {
        this.page--;
      }
      this.loadData();
    });
  }

  onReload() {
    this.page = 1;
    this.limit = 5;
    this.loadData();
  }

  getIndex(i: number): number {
    return (this.page - 1) * this.limit + i + 1;
  }
}
