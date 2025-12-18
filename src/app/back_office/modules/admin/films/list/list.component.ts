import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { Router } from '@angular/router';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchFilterComponent } from '../../../../shared/components/search-filter/search-filter.component';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { ToCapitaleCasePipe } from '../../../../shared/pipes/to-capitale-case.pipe';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-list',
  imports: [
    DurationPipe,
    PaginationComponent,
    SearchFilterComponent,
    ToCapitaleCasePipe,
    ConfirmComponent
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
    private confirmService: ConfirmService
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

  onDelete(id: string, title: string) {
    this.confirmService
      .open(
        'Delete Film',
        `Are you sure you want to delete this Film : <strong class="text-danger">${title.toUpperCase()}</strong> ?`
      )
      .subscribe((result) => {
        if (result) {
          this.filmService.deleteOne(id).subscribe(() => {
            this.films = this.films.filter((f) => f.id !== id);
          });
        }
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
