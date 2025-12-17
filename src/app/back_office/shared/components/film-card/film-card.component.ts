import { Component, Input } from '@angular/core';
import { Film } from '../../models/film.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-card',
  imports: [StarRatingComponent, DurationPipe , RouterLink],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css'
})
export class FilmCardComponent {

  @Input() item : Film = new Film()
}
