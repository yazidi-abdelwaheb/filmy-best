import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { CategoriesComponent } from "./categories/categories.component";
import { FilmsComponent } from "./films/films.component";
import { SeriesComponent } from "./series/series.component";

export const clientRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    loadChildren : () => import('./categories/categories.routes').then(m => m.CategoriesRoutes)
  },
  {
    path: 'films',
    component: FilmsComponent,
  },
  {
    path: 'series',
    component: SeriesComponent,
  },
];
