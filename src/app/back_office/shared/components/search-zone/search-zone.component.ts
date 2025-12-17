import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-zone',
  imports: [FormsModule],
  templateUrl: './search-zone.component.html',
  styleUrl: './search-zone.component.css',
})
export class SearchZoneComponent {
  @Input() search: string = '';
  @Input() placeholder !: string

  @Output() searchfn = new EventEmitter<string>();

  onSearch() {
    this.searchfn.emit(this.search);
  }
}
