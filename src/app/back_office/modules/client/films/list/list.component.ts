import { Component, OnInit } from '@angular/core';
import { FilmCardComponent } from '../../../../shared/components/film-card/film-card.component';
import { FormsModule } from '@angular/forms';
import { FilmsService } from '../../../../shared/services/films.service';
import { Film } from '../../../../shared/models/film.model';
import { ShowMoreBtnComponent } from '../../../../shared/components/show-more-btn/show-more-btn.component';
import { SearchZoneComponent } from '../../../../shared/components/search-zone/search-zone.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  imports: [
    FilmCardComponent,
    FormsModule,
    ShowMoreBtnComponent,
    SearchZoneComponent,
    
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  films: Film[] = [];
  page: number = 1;
  limit: number = 3;
  search: string = '';
  isLoading: boolean = false;

  constructor(private fs: FilmsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(mode?: 'search') {
    this.isLoading = true;
    this.fs.list(this.page, this.limit, '', this.search).subscribe({
      next: (data) => {
        mode === 'search'
          ? (this.films = [...data])
          : (this.films = [...this.films, ...data]);
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
      this.films =[]
      this.loadData();
    }
  }
}
