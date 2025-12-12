import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './list/show/show.component';
import { EditComponent } from './list/edit/edit.component';

export const seriesRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: ShowComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
    ],
  },
] ;
