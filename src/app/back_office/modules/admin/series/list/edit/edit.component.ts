import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../../shared/models/film.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../../../../shared/services/films.service';
import { FormsModule } from '@angular/forms';
import { Episode, Serie } from '../../../../../shared/models/serie.model';
import { SeriesService } from '../../../../../shared/services/series.service';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import Category from '../../../../../shared/models/category.model';
import { EpCardComponent } from '../../../../../shared/components/ep-card/ep-card.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, RouterLink, EpCardComponent, QuillModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  serie: Serie = new Serie();
  categories: Category[] = [];
  selectedCategory: string = '';
  ep: Episode = new Episode();
  epIndex: number = 1;

  constructor(
    private fs: SeriesService,
    private router: Router,
    private cs: CategoriesService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.actRoute.snapshot.params['id'];
    this.fs.getOne(id).subscribe((data) => {
      this.serie = data;
      this.selectedCategory = this.serie.categories[0].id;
    });

    this.cs.all().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    const id = this.actRoute.snapshot.params['id'];
    this.serie.episodes.filter((e) => e && e.image && e.image.trim() !== '');
    this.fs.updateOne(id, this.serie).subscribe(() => {
      this.router.navigate(['/admin/series']);
    });
  }

  addEp() {
    const nextIndex = this.serie.episodes.length + 1;

    this.ep.index = nextIndex;

    this.serie.episodes = [...this.serie.episodes, { ...this.ep }];

    this.epIndex = nextIndex + 1;
    this.ep = new Episode();
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

  deleteEp(index: number) {
    this.serie.episodes.splice(index - 1, 1);
    this.serie.episodes.forEach((ep, i) => (ep.index = i + 1));
    this.epIndex--;
  }
}
