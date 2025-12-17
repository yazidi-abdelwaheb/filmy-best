import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Film } from '../../../shared/models/film.model';
import { Serie } from '../../../shared/models/serie.model';
import Category from '../../../shared/models/category.model';
import { FilmsService } from '../../../shared/services/films.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { SeriesService } from '../../../shared/services/series.service';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { RouterLink } from '@angular/router';
import { FilmCardComponent } from '../../../shared/components/film-card/film-card.component';
import { SerieCardComponent } from '../../../shared/components/serie-card/serie-card.component';

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-landing',
  imports: [FilmCardComponent, RouterLink , SerieCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit , AfterViewInit {
  films: Film[] = [new Film()];
  series: Serie[] = [new Serie()];
  ctagories: Category[] = [new Category()];
  carouselItems: CarouselItem[] = [];

  @ViewChild('statsSection') statsSection!: ElementRef;

  // Valeurs finales (tu peux les calculer dynamiquement avec tes arrays)
  totalFilms = 250;
  totalSeries = 160;
  totalCategories = 15;

  // Valeurs animées
  animatedFilms = 0;
  animatedSeries = 0;
  animatedCategories = 0;

  
   ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.startAnimation();
      } else {
        // Quand l’utilisateur sort de la section → reset à 0
        this.resetStats();
      }
    }, { threshold: 0.3 });

    observer.observe(this.statsSection.nativeElement);
  }

  startAnimation() {
    this.animateValue('animatedFilms', this.totalFilms, 500);
    this.animateValue('animatedSeries', this.totalSeries, 500);
    this.animateValue('animatedCategories', this.totalCategories, 500);
  }

  resetStats() {
    this.animatedFilms = 0;
    this.animatedSeries = 0;
    this.animatedCategories = 0;
  }

  animateValue(property: 'animatedFilms' | 'animatedSeries' | 'animatedCategories', end: number, duration: number) {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    this.ngZone.runOutsideAngular(() => {
      const timer = setInterval(() => {
        start++;
        this.ngZone.run(() => {
          (this as any)[property] = start;
        });
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  }

  
  constructor(
    private fs: FilmsService,
    private cs: CategoriesService,
    private ss: SeriesService,
    private ngZone: NgZone
  ) {
    this.carouselItems = [
      {
        image: 'https://media.gqmagazine.fr/photos/608297ace24bc2c55a7e1c2f/16:9/w_1280,c_limit/plus%20belles%20affiches%20cin%C3%A9ma.png',
        title: 'Inception',
        description:
          'Un thriller de science-fiction réalisé par Christopher Nolan.',
        link: '/films',
      },
      {
        image: 'https://www.la-retouche-photo.com/wp-content/uploads/2017/10/top-30-affiches-films-1970-2000-la-retouche-photo.jpg',
        title: 'Interstellar',
        description: 'Voyage épique à travers l’espace et le temps.',
        link: '/films',
      },
      {
        image: 'https://www.cinemaffiche.fr/7346-tm_large_default/fast-and-furious-hobbs-show.jpg',
        title: 'The Dark Knight',
        description: 'Batman face au Joker dans un chef-d’œuvre du cinéma.',
        link: '/series',
      },
    ];
  }

  ngOnInit(): void {
    this.fs.list(1, 5).subscribe((data) => {
      this.films = data;
    });

    this.cs.all().subscribe((data) => {
      this.ctagories = data;
    });

    this.ss.list(1, 5).subscribe((data) => {
      this.series = data;
    });
  }
}
