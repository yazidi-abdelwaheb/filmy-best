import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Serie } from '../../models/serie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-serie-card',
  imports: [StarRatingComponent , RouterLink],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent {
  @Input() item : Serie = new Serie()
}
