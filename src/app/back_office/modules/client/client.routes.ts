import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { CategoriesComponent } from "./categories/categories.component";
import { FilmsComponent } from "./films/films.component";
import { SeriesComponent } from "./series/series.component";
import { RankingComponent } from "./ranking/ranking.component";

export const clientRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'ranking',
    component: RankingComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    loadChildren : () => import('./categories/categories.routes').then(m => m.CategoriesRoutes)
  },
  {
    path: 'films',
    component: FilmsComponent,
    loadChildren : () => import('./films/films.routes').then(m => m.filmsRoutes)
  },
  {
    path: 'series',
    component: SeriesComponent,
    loadChildren : () => import('./series/series.routes').then(m => m.SeriesRoutes)
  },
];
