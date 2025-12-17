import { Component } from '@angular/core';
import { Film } from '../../../../../shared/models/film.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmsService } from '../../../../../shared/services/films.service';
import { DurationPipe } from '../../../../../shared/pipes/duration.pipe';
import { StarRatingComponent } from '../../../../../shared/components/star-rating/star-rating.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-show',
  imports: [RouterLink , DurationPipe , StarRatingComponent , UpperCasePipe],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  film!: Film;

  constructor(private fs: FilmsService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fs.getOne(id).subscribe((data) => (this.film = data));
    }
    
  }
}
