import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-more-btn',
  standalone: true,
  imports: [NgIf],
  templateUrl: './show-more-btn.component.html',
  styleUrls: ['./show-more-btn.component.css'],
})
export class ShowMoreBtnComponent {
  @Input() isLoading: boolean = false;
  @Output() action = new EventEmitter<void>();

  showMore() {
    if (!this.isLoading) {
      this.action.emit();
    }
  }
}
