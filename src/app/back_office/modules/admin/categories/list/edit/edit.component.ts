import { Component } from '@angular/core';
import { Film } from '../../../../../shared/models/film.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../../../../shared/services/films.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import Category from '../../../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  imports: [FormsModule,RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  category: Category = new Category();

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) {}

  onSubmit() {
    this.categoryService.updateOne(this.category.id,this.category).subscribe(() => {
      this.toastr.success(`Category "${this.category.label}" updated successfully!`)
      this.router.navigate(['/admin/category']);
    });
  }

  ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
     if(id){
      this.categoryService.getOne(id).subscribe((data) => (this.category = data));
     }
    
  }
}
