import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';

export const SeriesRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id',
    component: ShowComponent,
  },
  
];
