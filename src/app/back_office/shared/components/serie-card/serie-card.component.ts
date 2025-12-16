import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-serie-card',
  imports: [StarRatingComponent],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent {
  @Input() item : Serie = new Serie()
}
