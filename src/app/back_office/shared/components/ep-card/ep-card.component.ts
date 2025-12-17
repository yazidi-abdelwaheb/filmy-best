import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Episode } from '../../models/serie.model';
import { DurationPipe } from '../../pipes/duration.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ep-card',
  imports: [StarRatingComponent , DurationPipe],
  templateUrl: './ep-card.component.html',
  styleUrl: './ep-card.component.css'
})
export class EpCardComponent {

  @Input() ep : Episode = new Episode()
  @Input() withDeleted : boolean = true;
  

  @Output() delete = new EventEmitter<number>()


  deleteEp(){
    this.delete.emit(this.ep.index)
  }
}
