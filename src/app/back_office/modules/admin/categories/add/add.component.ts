import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  imports: [FormsModule,RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  category: Category = new Category();

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private toastr : ToastrService
  ) {}

  onSubmit() {
    this.categoryService.addOne(this.category).subscribe(() => {
      this.toastr.success(`Category "${this.category.label}" added successfully!`)
      this.router.navigate(['/admin/category']);
    });
  }
}
