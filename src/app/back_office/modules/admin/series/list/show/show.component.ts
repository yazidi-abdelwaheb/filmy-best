import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../../../../shared/components/star-rating/star-rating.component';
import { SeriesService } from '../../../../../shared/services/series.service';
import { Serie } from '../../../../../shared/models/serie.model';
import { EpCardComponent } from '../../../../../shared/components/ep-card/ep-card.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-show',
  imports: [RouterLink, StarRatingComponent, EpCardComponent, UpperCasePipe],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  serie!: Serie;
  constructor(private fs: SeriesService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fs.getOne(id).subscribe((data) => {
        this.serie = data;
        console.log(this.serie)
      });
    }
  }
}
