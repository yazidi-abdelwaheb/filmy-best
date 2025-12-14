import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent  {

  @Input() page: number = 1;
  @Input() limit: number = 10;


  @Input() hasNext!: boolean;

  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  limits: number[] = [5, 10, 20, 50];

 

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  nextPage() {
    if (this.hasNext) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  onLimitChange() {
    this.page = 1;
    this.limitChange.emit(this.limit);
  }
}
