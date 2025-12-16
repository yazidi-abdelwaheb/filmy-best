import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'film',
    component : FilmsComponent,
    loadChildren : () => import('./films/films.routes').then(m => m.filmRoutes)
  },
  {
    path: 'category',
    component : FilmsComponent,
    loadChildren : () => import('./categories/categories.routes').then(m => m.filmRoutes)
  },
{
    path: 'series',
    component : SeriesComponent,
    loadChildren : () => import('./series/series.routes').then(m => m.seriesRoutes)
  },
];
