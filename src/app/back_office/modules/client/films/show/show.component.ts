import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { VideoCardComponent } from '../../../../shared/components/video-card/video-card.component';
import { ToCapitaleCasePipe } from '../../../../shared/pipes/to-capitale-case.pipe';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { NotFoundService } from '../../../../shared/services/not-found.service';

@Component({
  selector: 'app-show',
  imports: [
    NgFor,
    VideoCardComponent,
    DurationPipe,
    ToCapitaleCasePipe,
    StarRatingComponent,
    RouterLink,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  film: Film = new Film();
  id!: string;

  constructor(
    private fs: FilmsService,
    private actRoute: ActivatedRoute,
    private _404Service: NotFoundService
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.fs.getOne(this.id).subscribe({
      next: (data) => {
        this.film = data;
      },
      error: (e) => {
        // Vérifie le code HTTP
        if (e.status === 404) {
          this._404Service.set(true);
        }
      },
    });
  }
}
