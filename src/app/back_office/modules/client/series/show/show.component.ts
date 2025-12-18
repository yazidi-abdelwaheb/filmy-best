import { Component, OnInit } from '@angular/core';
import { Episode, Serie } from '../../../../shared/models/serie.model';
import { SeriesService } from '../../../../shared/services/series.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToCapitaleCasePipe } from '../../../../shared/pipes/to-capitale-case.pipe';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { NgFor, NgIf } from '@angular/common';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { VideoCardComponent } from '../../../../shared/components/video-card/video-card.component';
import { NotFoundService } from '../../../../shared/services/not-found.service';

@Component({
  selector: 'app-show',
  imports: [
    ToCapitaleCasePipe,
    DurationPipe,
    NgFor,
    StarRatingComponent,
    RouterLink,
    VideoCardComponent,
    NgIf,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  serie: Serie = new Serie();
  id!: string;
  selectedEpisode: Episode | null = null;

  constructor(
    private ss: SeriesService,
    private actRoute: ActivatedRoute,
    private _404Service: NotFoundService
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.ss.getOne(this.id).subscribe({
      next: (data) => {
        this.serie = data;
      },
      error: (e) => {
        // Vérifie le code HTTP
        if (e.status === 404) {
          this._404Service.set(true);
        }
      },
    });
  }

  onEpisodeClick(ep: Episode) {
    this.selectedEpisode = ep;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
