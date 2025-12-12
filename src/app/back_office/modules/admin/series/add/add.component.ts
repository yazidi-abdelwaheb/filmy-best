import { Component } from '@angular/core';
import { Film } from '../../../../shared/models/film.model';
import { FilmsService } from '../../../../shared/services/films.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  film: Film = new Film();

  constructor(private fs: FilmsService, private router: Router) {}

  onSubmit() {
    this.fs.addOne(this.film).subscribe(() => {
      this.router.navigate(['/admin/film']);
    });
  }
}
