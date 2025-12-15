import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../shared/services/categories.service';
import Category from '../../../../shared/models/category.model';
import { SeriesService } from '../../../../shared/services/series.service';
import { Episode, Serie } from '../../../../shared/models/serie.model';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-add',
  imports: [FormsModule, RouterLink , StarRatingComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  serie: Serie = new Serie();
  categories: Category[] = [];
  selectedCategory: string = '';
  ep : Episode = new Episode();
  epIndex:number = 1

  constructor(
    private fs: SeriesService,
    private router: Router,
    private cs: CategoriesService
  ) {}

  ngOnInit(): void {
    this.serie.categories = [];
    this.serie.episodes = [];
    this.cs.all().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.serie.episodes.filter((e) => e && e.image && e.image.trim() !== '');
    this.fs.addOne(this.serie).subscribe(() => {
      this.router.navigate(['/admin/series']);
    });
  }

  addEp(){
    this.ep.index = this.epIndex
    this.serie.episodes = [...this.serie.episodes,this.ep]
    this.epIndex ++
    this.ep = new Episode()
  }

  onSelectCategories() {
    if (this.selectedCategory) {
      const categoryToAdd = this.categories.find(
        (e) => e.id === this.selectedCategory
      );
      if (categoryToAdd) {
        if (!this.serie.categories.some((c) => c.id === categoryToAdd.id)) {
          this.serie.categories = [...this.serie.categories, categoryToAdd];
        }
      }
    }

    this.selectedCategory = '';
  }

  isCategorySelected(itemId: string | number): boolean {
    return this.serie.categories?.some((c) => c.id === itemId) || false;
  }

  deleteCategoriesSelected(itemId: string | number) {
    this.serie.categories = this.serie.categories.filter(
      (c) => c.id !== itemId
    );
  }

  onEpisodeNbrChange() {
    
  }
}
