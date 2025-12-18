import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeriesService } from '../../../../shared/services/series.service';
import { Serie } from '../../../../shared/models/serie.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchFilterComponent } from '../../../../shared/components/search-filter/search-filter.component';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { ToCapitaleCasePipe } from '../../../../shared/pipes/to-capitale-case.pipe';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-list',
  imports: [
    FormsModule,
    PaginationComponent,
    SearchFilterComponent,

    ToCapitaleCasePipe,
    ConfirmComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  series: Serie[] = [];

  page = 1;
  limit = 5;
  hasNext = false;

  constructor(
    private seriesService: SeriesService,
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
    this.seriesService
      .list(
        this.page,
        this.limit,
        params?.filterCategory ? params?.filterCategory : '',
        params?.search ? params?.search : '',
        params?.sort ? params?.sort : 'title',
        params?.order ? params?.order : 'asc'
      )
      .subscribe((data) => {
        this.series = data;
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
    this.router.navigate(['/admin/series', id]);
  }

  onEdit(id: string) {
    this.router.navigate(['/admin/series', id, 'edit']);
  }

  onAdd() {
    this.router.navigate(['/admin/series/add']);
  }

  onDelete(id: string, title: string) {
    this.confirmService
      .open(
        'Delete Serie',
        `Are you sure you want to delete this Serie : <strong class="text-danger">${title.toUpperCase()}</strong> ?`
      )
      .subscribe((result) => {
        if (result) {
          this.seriesService.deleteOne(id).subscribe(() => {
            this.series = this.series.filter((f) => f.id !== id);
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
