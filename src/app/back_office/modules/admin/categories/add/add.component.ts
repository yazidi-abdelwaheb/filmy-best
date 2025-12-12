import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Category from '../../../../shared/models/category.model';
import { CategoriesService } from '../../../../shared/services/categories.service';

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
    private router: Router
  ) {}

  onSubmit() {
    this.categoryService.addOne(this.category).subscribe(() => {
      this.router.navigate(['/admin/category']);
    });
  }
}
