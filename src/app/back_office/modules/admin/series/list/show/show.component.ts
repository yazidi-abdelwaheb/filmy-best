import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../../../../shared/components/star-rating/star-rating.component';
import { SeriesService } from '../../../../../shared/services/series.service';
import { Serie } from '../../../../../shared/models/serie.model';

@Component({
  selector: 'app-show',
  imports: [RouterLink , StarRatingComponent],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  serie!: Serie;

  constructor(private fs: SeriesService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fs.getOne(id).subscribe((data) => (this.serie = data));
    }
    
  }
}
