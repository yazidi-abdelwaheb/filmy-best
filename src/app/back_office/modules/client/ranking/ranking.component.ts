import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../../shared/models/film.model';
import { Serie } from '../../../shared/models/serie.model';
import { FilmsService } from '../../../shared/services/films.service';
import { SeriesService } from '../../../shared/services/series.service';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

interface Item {
  id: string;
  title: string;
  image: string;
  rating: number;
  rank: number;
}
@Component({
  selector: 'app-ranking',
  imports: [NgFor, FormsModule, NgClass , RouterLink , StarRatingComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent implements OnInit {
  topFilms: Film[] = [];
  topSeries: Serie[] = [];

  constructor(private fs: FilmsService, private ss: SeriesService) {}

  ngOnInit(): void {
    this.fs
      .list(1, 10, undefined, undefined, 'rating', 'desc')
      .subscribe((data) => {
        this.topFilms = data;
      });

    this.ss.list(1, 10, undefined, undefined, 'rating','desc').subscribe((data) => {
      this.topSeries = data;
    });
  }

getStarType(index: number, rating: number): 'full' | 'half' | 'empty' {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  if (index < fullStars) return 'full';
  if (index === fullStars && decimal >= 0.25 && decimal < 0.75) return 'half';
  if (index === fullStars && decimal >= 0.75) return 'full';
  return 'empty';
}


}
