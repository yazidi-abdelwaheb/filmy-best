import { Component, OnInit } from '@angular/core';
import { Serie } from '../../../../shared/models/serie.model';
import { SeriesService } from '../../../../shared/services/series.service';
import { SerieCardComponent } from '../../../../shared/components/serie-card/serie-card.component';
import { SearchZoneComponent } from '../../../../shared/components/search-zone/search-zone.component';
import { ShowMoreBtnComponent } from '../../../../shared/components/show-more-btn/show-more-btn.component';

@Component({
  selector: 'app-list',
  imports: [ SerieCardComponent , SearchZoneComponent , ShowMoreBtnComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
series: Serie[] = [];
  page: number = 1;
  limit: number = 3;
  search: string = '';
  isLoading: boolean = false;

  constructor(private ss: SeriesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(mode?: 'search') {
    this.isLoading = true;
    this.ss.list(this.page, this.limit, '', this.search).subscribe({
      next: (data) => {
        mode === 'search'
          ? (this.series = [...data])
          : (this.series = [...this.series, ...data]);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  showMore() {
    if (this.isLoading) return;
    this.page++;
    this.loadData();
  }

  onSearch(q: string) {
    this.search = q;
    if (this.search.trim()) {
      this.page = 1;
      this.loadData('search');
    } else {
      this.series =[]
      this.loadData();
    }
  }
}
