import { NgClass } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [NgClass],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating!: number;   
  @Input() max: number = 10;  

  stars: number[] = [];
  fullStars: number = 0;
  hasHalfStar: boolean = false;

  ngOnChanges() {
    this.stars = Array(this.max).fill(0);
    this.fullStars = Math.floor(this.rating);
    this.hasHalfStar = (this.rating - this.fullStars) >= 0.5;
  }
}
