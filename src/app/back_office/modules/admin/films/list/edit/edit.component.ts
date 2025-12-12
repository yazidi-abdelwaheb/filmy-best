import { Component } from '@angular/core';
import { Film } from '../../../../../shared/models/film.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../../../../shared/services/films.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [FormsModule , RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
   film!: Film;

  constructor(
    private fs: FilmsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fs.getOne(id).subscribe((data) => (this.film = data));
    }
    
  }

  onSubmit() {
    this.fs.updateOne(this.film.id, this.film).subscribe(() => {
      this.router.navigate(['/admin/film']);
    });
  }
}
