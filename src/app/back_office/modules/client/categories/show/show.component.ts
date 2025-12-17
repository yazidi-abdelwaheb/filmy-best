import { Component, NgZone, OnInit } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { Serie } from '../../../../shared/models/serie.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { SeriesService } from '../../../../shared/services/series.service';
import { ActivatedRoute } from '@angular/router';
import { SerieCardComponent } from '../../../../shared/components/serie-card/serie-card.component';
import { FilmCardComponent } from '../../../../shared/components/film-card/film-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show',
  imports: [SerieCardComponent, FilmCardComponent, FormsModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  films: Film[] = [];
  series: Serie[] = [];
  filmsPage: number = 1;
  seriesPage: number = 1;
  limite: number = 3;
  id!: string;
  searchFilms: string = '';
  serachseries: string = '';

  constructor(
    private fs: FilmsService,
    private ss: SeriesService,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  loadFilms(mode?: 'search') {
    this.fs
      .list(this.filmsPage, this.limite, this.id, this.searchFilms)
      .subscribe((data) => {
        mode === 'search'
          ? (this.films = [...data])
          : (this.films = [...this.films, ...data]);
      });
  }

  loadSeries(mode?: 'search') {
    this.ss
      .list(this.seriesPage, this.limite, this.id, this.serachseries)
      .subscribe((data) => {
        mode === 'search'
          ? (this.series = [...data])
          : (this.series = [...this.series, ...data]);
      });
  }

  onSearchFilms() {
    if (this.searchFilms.trim()) {
      this.filmsPage = 1;
      this.loadFilms('search');
    } else {
      this.loadFilms("search");
    }
  }

  onSearchSeries() {
    if (this.serachseries.trim()) {
      this.seriesPage = 1;
      this.loadSeries("search");
    } else {
      this.searchFilms=""
      this.loadSeries("search");
    }
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.loadFilms();
    this.loadSeries();
  }

  scrollLeft(containerId: string) {
    const el = document.getElementById(containerId);
    if (el) {
      const cardWidth = el.clientWidth / 3;
      this.ngZone.onStable.subscribe(() =>
        el.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' })
      );
    }
  }

  scrollRight(containerId: string) {
    if (containerId === 'seriesScroll') {
      this.seriesPage++;
      this.ss.list(this.seriesPage, this.limite, this.id).subscribe((data) => {
        this.series = [...this.series, ...data];
        this.ngZone.onStable.subscribe(() => this.doScroll(containerId));
      });
    } else {
      this.filmsPage++;
      this.fs.list(this.filmsPage, this.limite, this.id).subscribe((data) => {
        this.films = [...this.films, ...data];
        this.ngZone.onStable.subscribe(() => this.doScroll(containerId));
      });
    }
  }

  private doScroll(containerId: string) {
    const el = document.getElementById(containerId);
    if (el) {
      const cardWidth = el.clientWidth / 3;
      el.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
  }
}
